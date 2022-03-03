import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RestResponse } from '../RestResponse';
import { components } from 'src/binding/Binding';

export type AccessibilityNotificationResponse = components["schemas"]["AccessibilityResponse"]
export type AccessibilityNotificationResolution = components["schemas"]["AccessibilityNotificationResolutionDto"]
export type AccessibilityNotification = components["schemas"]["AccessibilityNotificationDto"]

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  baseUrl = "api/accessibility";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getUnresolvedByTrailByCode(code: String): Observable<AccessibilityNotificationResponse> {
    return this.httpClient.get<AccessibilityNotificationResponse>(this.baseUrl + "/unresolved/" + code)
      .pipe(
        tap(),
        catchError(this.handleError<AccessibilityNotificationResponse>('get unresolved by trail', null))
      );
  }

  getUnresolved(skip : number, limit: number): Observable<AccessibilityNotificationResponse> {
    let params = new HttpParams().set("skip", skip.toString()).append("limit", limit.toString())
    return this.httpClient.get<AccessibilityNotificationResponse>(this.baseUrl + "/unresolved", {params: params})
      .pipe(
        tap(),
        catchError(this.handleError<AccessibilityNotificationResponse>('get unresolved', null))
      );
  }

  getAllResolved(): Observable<AccessibilityNotificationResponse> {
    return this.httpClient.get<AccessibilityNotificationResponse>(this.baseUrl + "/solved")
      .pipe(
        tap(),
        catchError(this.handleError<AccessibilityNotificationResponse>('get all resolved', null))
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
