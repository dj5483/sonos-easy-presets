import { Injectable } from '@angular/core';
import { Player } from '../player/player';
import { PLAYERS } from '../player/mock-players';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Status } from '../status';
import { PREDEFINED_GROUPS } from './mock-groups';
import { Group } from './group';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GroupService {
  coordinator: Player;

  private sonosUrl = 'http://192.168.1.101:5005';  // URL to web api

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return of(PLAYERS);
  }

  getPredefinedGroups(): Observable<Group[]> {
    return of(PREDEFINED_GROUPS);
  }

  invokeGrouping(group: Group): void {
    // const url = this.sonosUrl + '/preset/' + name;
    console.log('invoking grouping: ' + group);
    this.leaveExcludedPlayers(group);
    this.groupPlayers(group);
    // this.http.get<Status>(url).pipe(
    //   tap(_ => console.log(`invoked preset =${name}`)),
    //   catchError(this.handleError<Status>(`invokePreset preset=${name}`))).subscribe();
  }

  private groupPlayers(group: Group): void {
    if (group.players.length > 0) {
      this.coordinator = group.players[0].player;
      this.setVolume(this.coordinator, group.players[0].volume);
      for (const player of group.players) {
        console.log('evaluating player: ' + player.player.name);
        if (player.player === this.coordinator) {
          console.log('not joining coordinator ' + player);
        } else {
          this.joinPlayer(this.coordinator, player.player);
          this.setVolume(player.player, player.volume);
        }
      }
    }
  }

  private leaveExcludedPlayers(group: Group): void {
    for (const player of PLAYERS) {
      console.log('evaluating group: ' + player);
      const playerInGroup = group.players.find(p => p.player === player);
      if (playerInGroup != null) {
        console.log('not removing' + player.name);
      } else {
        this.removePlayer(player);
      }
    }
  }

  private setVolume(player: Player, volume: number): void {
    const url = this.sonosUrl + '/' + player.name + '/volume/' + volume;
    console.log('adjusting volume on player: ' + player.name);
    this.http.get<Status>(url).pipe(
      tap(_ => console.log(`volume adjust =${player.name}`)),
      catchError(this.handleError<Status>(`set volume=${player.name}`))).subscribe();
  }

  private removePlayer(player: Player): void {
    const url = this.sonosUrl + '/' + player.name + '/leave';
    console.log('removing player: ' + player.name);
    this.http.get<Status>(url).pipe(
      tap(_ => console.log(`invoked leave =${player.name}`)),
      catchError(this.handleError<Status>(`invokePreset preset=${player.name}`))).subscribe();
  }

  private joinPlayer(coordinator: Player, player: Player): void {
    const url = this.sonosUrl + '/' + player.name + '/join/' + coordinator.name;
    console.log('joining player: ' + player.name + ' to: ' + coordinator.name);
    this.http.get<Status>(url).pipe(
      tap(_ => console.log(`invoked join =${player.name}`)),
      catchError(this.handleError<Status>(`invoked join=${player.name}`))).subscribe();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
