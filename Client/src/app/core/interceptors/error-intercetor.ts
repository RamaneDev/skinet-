import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(request).pipe(
      catchError(error => {
        if(error)
        {
          if(error.status === 400) {
            if(error.error.errors) {
              console.log('validation errors');
              throw error.error;
            } else {
              console.log('badrequest...');
            }
          }
          if(error.status === 404)
             this.route.navigateByUrl('/not-found');
          
          if(error.status === 500)
             this.route.navigateByUrl('/server-error');
        }
        return throwError(() => error);
      })
    );
  }
}
