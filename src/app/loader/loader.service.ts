import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, concatMap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading: Observable<boolean> = this.loadingSubject$.asObservable();
  constructor() { }

  loadingOn() {
    this.loadingSubject$.next(true);
  }

  loadingOff() {
    this.loadingSubject$.next(false);

  }

  showLoadingUntill<T>(obj$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obj$),
      finalize(() => this.loadingOff())
    );

  }
}
