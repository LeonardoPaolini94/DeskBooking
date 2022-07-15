import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN = sessionStorage.getItem('token') ?? '';
    const decodedToken = jwtDecode(TOKEN) as any;
    if(TOKEN && decodedToken['exp'] > Date.now() / 1000) {
      return next.handle(request.clone({setHeaders: {TOKEN}}))
    }



    return next.handle(request);
  }
}
