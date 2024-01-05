import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { authInterceptorInterceptor } from './auth-interceptor.interceptor';

describe('authInterceptorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


  // it('should add the Authorization header to the request', () => {
  //   const interceptor = authInterceptorInterceptor
  //   const request = new HttpRequest('GET', '/api/users');

  //   interceptor.intercept(request, {}).subscribe((response: HttpResponse<any>) => {
  //     expect(response.headers.get('Authorization')).toEqual('Bearer token');
  //   });


});
