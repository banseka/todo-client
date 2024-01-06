import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, shareReplay, tap, throwError } from 'rxjs';
import { ErrorMessageService } from '../error-message/error-message.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  constructor(private httpClient: HttpClient, private messageService: ErrorMessageService) { }

  postData<T>(url: string, params: HttpParams): Observable<T | string>{
    return this.httpClient.post<T>(url, params).pipe(
      tap((response: any) => {
        if (response.status != "200") {
          throw new Error(response.message);
        }

      }),
      shareReplay(),
      catchError(error => this.handleError(error))
    )

  }

  get<T>(url: string, params?: HttpParams): Observable<T| string> {
    const options = { params };
    return this.httpClient.get<T>(url, options).pipe(
      tap((response: any) => {
        if (response.status != "200") {
          throw new Error(response.message);
        }

      }),
      shareReplay(),

      catchError(error => this.handleError(error))
    );
  }

  update<T>(id: string , url: string, params?: any): Observable<T| string> {
    url = `${url}/${id}`
    return this.httpClient.put<T>(url, params);
  }

  delete<T>(id: string , url: string): Observable<T| string> {
    url = `${url}/${id}`
    return this.httpClient.delete<T>(url);
  }

  handleError(error: HttpErrorResponse) {
    const message = error.message;
    this.messageService.showErrors(message);
    return of("error processing reuest");
  }
}
