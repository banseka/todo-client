import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorsSubject$ = new BehaviorSubject<string[]>([])

  errors$: Observable<string[]> = this.errorsSubject$.asObservable()
    .pipe(

      filter(messaages => messaages && messaages.length > 0)
    );
  constructor() { }

  showErrors(...errors: string[]) {
    this.errorsSubject$.next(errors)
  }
}
