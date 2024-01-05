import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  constructor(private httpClient: HttpClient) { }

  postData<T>(url: string, params: HttpParams): Observable<T | string>{
    return this.httpClient.post<T>(url, params).pipe(
      catchError(error => this.handleError(error))
    )

  }

  get<T>(url: string, params?: HttpParams): Observable<T| string> {
    const options = { params };
    return this.httpClient.get<T>(`$${url}`, options).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return of("error processing reuest");
  }
}
