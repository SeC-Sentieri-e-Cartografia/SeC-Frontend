import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Maintenance } from './Maintenance';
import { MaintenanceResponse } from './MaintenanceResponse';
import { RestResponse } from './RestResponse';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  baseUrl = "api/maintenance";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getFuture(): Observable<MaintenanceResponse> {
    return this.httpClient.get<MaintenanceResponse>(this.baseUrl + "/future")
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<MaintenanceResponse>('Future maintenance', null))
      );
  }

  getPast(): Observable<MaintenanceResponse> {
    return this.httpClient.get<MaintenanceResponse>(this.baseUrl + "/past")
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<MaintenanceResponse>('Past maintenance', null))
      );
  }

  save(maintenance: Maintenance): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(this.baseUrl, maintenance)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<RestResponse>('Past maintenance', null))
      );
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
