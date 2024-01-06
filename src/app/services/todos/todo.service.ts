import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from 'rxjs';
import { ErrorMessageService } from '../../error-message/error-message.service';
import { LoaderService } from '../../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoSubject$ = new BehaviorSubject<any[]>([])
  todos$: Observable<any[]> = this.todoSubject$.asObservable()
  constructor(
    private httpService: HttpServiceService,
    private messageService: ErrorMessageService,
    private loaderService: LoaderService
    ) { }


  addTodo(params: any){
    const url = `${environment.baseurl}/todos/create`
    const createTodo$ = this.httpService.postData(url, params).pipe(
      shareReplay(),
    )
    this.loaderService.showLoadingUntill(createTodo$).subscribe()

    return createTodo$;
  }

  loadUserTodo(params: any){
    const url = `${environment.baseurl}/todos`
    const loadTodos$ = this.httpService.get(url, params).pipe(
      map((res: any) => {
        console.log(res);
        return res["data"]
      }),
      tap(todos => this.todoSubject$.next(todos)),
      shareReplay(),
    )
    this.loaderService.showLoadingUntill(loadTodos$).subscribe()

    return loadTodos$;
  }


  updateTodo(id: string ,params: any){
    delete params._id
    const url = `${environment.baseurl}/todos`
    const updateTodo$ = this.httpService.update(id, url, params).pipe(
      map((res: any) => {
        return res
      }),
      shareReplay(),
    )

    this.loaderService.showLoadingUntill(updateTodo$).subscribe()

    return updateTodo$;
  }

  deleteTodo(id: string){
    const url = `${environment.baseurl}/todos`
    const updateTodo$ = this.httpService.delete(id, url).pipe(
      map((res: any) => {
        return res
      }),
      shareReplay(),
    )

    this.loaderService.showLoadingUntill(updateTodo$).subscribe()

    return updateTodo$;
  }
}
