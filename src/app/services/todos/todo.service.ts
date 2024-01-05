import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { environment } from '../../../environments/environment.development';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { ErrorMessageService } from '../../error-message/error-message.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private httpService: HttpServiceService,
    private messageService: ErrorMessageService
    ) { }


  addTodo(params: any){
    const url = `${environment.baseurl}/todos/create`
    return this.httpService.postData(url, params).pipe(
      tap((response: any) => {
        if (response.status != "200") {
          throw new Error( "Sorry could not add Todo");
        }

      }),
      catchError(err =>{
        const message = err.message;
        this.messageService.showErrors(message);
        console.log(message);
          throw new Error (err);
      }),
      shareReplay(),
    )
  }
}
