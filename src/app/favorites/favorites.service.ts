import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Status } from '../status';
import { GroupService } from '../grouping/group.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FavoritesService {
  private sonosUrl = 'http://192.168.1.101:5005';  // URL to web api

  constructor(private http: HttpClient, private groupService: GroupService) { }

  getFavorites(): Observable<string[]> {
    const url = this.sonosUrl + '/favorites';
    return this.http.get<string[]>(url).pipe(
      tap(_ => console.log(`invoked preset =${name}`)),
      catchError(this.handleError<string[]>(`invokePreset preset=${name}`)));
  }

  invokeFavorite(favorite: string): void {
    const coordinator = this.groupService.coordinator;
    if (coordinator == null) {
      console.log('bad things... no coordinator');
    } else {
      const url = this.sonosUrl + '/' + coordinator.name + '/favorite/' + favorite;
      console.log('invoking: ' + url);
      this.http.get<Status>(url).pipe(
        tap(_ => console.log(`invoked favorite =${favorite}`)),
        catchError(this.handleError<Status>(`invoke favorite=${favorite}`))).subscribe();
    }
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
