import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpService: HttpServiceService) { }



  signUp(params: any){
    const url = `${environment.baseurl}/users/create`
   return  this.httpService.postData(url, params).pipe(
      tap(respose => console.log(respose))
    )
  }


  login(params: any){
    const url = `${environment.baseurl}/users/login`
    return  this.httpService.postData(url, params).pipe(
       tap(respose => console.log(respose))
     )
  }
}
