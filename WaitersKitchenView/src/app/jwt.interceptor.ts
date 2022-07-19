import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { environment } from '../environments/environment'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //set auth header for any request when logged in
    if (environment.isLoggedIn) {
      request = request.clone({
        setHeaders: { Authorization: `${localStorage.getItem('token')}` }
      });
    }

    return next.handle(request)
    .pipe(
      //will retry the request before errorhandling
      retry(2),

      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if(error.status === 0){
        alert("HTTP Error: Server not responding.");
        }else{
           alert("HTTP Error: " + error.error.message);
        }
       
        return throwError( () =>{
          new Error(error.message);
        });
      }));
  }
}

//interceptor: https://jasonwatmore.com/post/2021/09/24/angular-http-interceptor-to-set-auth-header-for-api-requests-if-user-logged-in
//provider module.ts: https://jasonwatmore.com/post/2020/09/21/angular-10-facebook-login-tutorial-example