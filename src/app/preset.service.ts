import { Injectable } from '@angular/core';
import { Preset } from './preset';
import { PRESETS } from './mock-presets';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Status } from './status';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PresetService {
  private sonosUrl = 'http://192.168.1.101:5005';  // URL to web api

  constructor(private http: HttpClient) { }

  getPresets(): Observable<Preset[]> {
    return of(PRESETS);
  }

  invokePreset(name: string): void {
    const url = this.sonosUrl + '/preset/' + name;
    console.log('invoking: ' + url);
    this.http.get<Status>(url).pipe(
      tap(_ => console.log(`invoked preset =${name}`)),
      catchError(this.handleError<Status>(`invokePreset preset=${name}`))).subscribe();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
