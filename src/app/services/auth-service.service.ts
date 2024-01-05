import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from 'rxjs';
import { ErrorMessageService } from '../error-message/error-message.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userSubject$ = new BehaviorSubject<any>(null)
  user$: Observable<any> = this.userSubject$.asObservable()

  constructor(
    private httpService: HttpServiceService,
    private messageService: ErrorMessageService,
    private loadingSerivce: LoaderService

    ) { }



  signUp(params: any){
    const url = `${environment.baseurl}/users/create`
   const signup =   this.httpService.postData(url, params).pipe(
      tap((respose: any) => {
        if (!respose) {
           throw new Error("Sorry could not sign you up");
        }
      }),
      catchError(err =>{
        const message = err.message;
        this.messageService.showErrors(message);
        console.log(message);
         throw new Error(err);
      }),
    )
    this.loadingSerivce.showLoadingUntill(signup).subscribe()
      return signup;
  }


  login(params: any){
    const url = `${environment.baseurl}/users/login`
    const auth =   this.httpService.postData(url, params).pipe(
      tap((response: any) => {
        if (!response) {
           throw new Error("Sorry could not sign you up");
        }

        if (response.status != "200") {
          throw new Error(response.message|| "email or pAassword incorrext");

        }

        if (!response.token || !response.data) {
          throw new Error(response.message|| "email or pAassword incorrext");

        }

        if (response.token && response.data) {
          this.userSubject$.next(response.data)
        }
      }),
      catchError(err =>{
        const message = err.message;
        this.messageService.showErrors(message);
        console.log(message);
         throw new Error(err);
      }),
      shareReplay()

     )
     this.loadingSerivce.showLoadingUntill(auth).subscribe()
     return auth;

  }
}
