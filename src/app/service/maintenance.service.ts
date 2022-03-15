import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { components } from 'src/binding/Binding';
import { RestResponse } from '../RestResponse';


export type MaintenanceDto = components["schemas"]["MaintenanceDto"]
export type MaintenanceResponse = components["schemas"]["MaintenanceResponse"]
export type MaintenanceCreation = components["schemas"]["MaintenanceDto"]

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

  getPastForTrail(code: string) {
    return this.httpClient.get<MaintenanceResponse>(this.baseUrl + "/past/" + code)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<MaintenanceResponse>('Past maintenance by code', null))
      );
  }

  save(maintenance: MaintenanceDto): Observable<RestResponse> {
    return this.httpClient.put<RestResponse>(this.baseUrl, maintenance)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<RestResponse>('Save maintenance', null))
      );
  }

  deleteById(_id: any): Observable<RestResponse> {
    return this.httpClient.delete<RestResponse>(this.baseUrl + "/" + _id)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<RestResponse>('Delete maintenance', null))
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
