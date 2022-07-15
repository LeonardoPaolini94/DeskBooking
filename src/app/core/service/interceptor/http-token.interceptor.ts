import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN = sessionStorage.getItem('token') ?? '';
    const decodedToken = jwtDecode(TOKEN) as any;
    if (TOKEN && decodedToken['exp'] > Date.now() / 1000) {
      return next.handle(request.clone({setHeaders: {TOKEN}}));
    }

    return next.handle(request)
  }
}
