import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(request).pipe(
      catchError(error => {
        if(error)
        {
          if(error.status === 400) {
            if(error.error.errors) {              
              throw error.error;
            } else {
              this.toastr.error(error.error.message, error.error.statusCode);
            }
          }

          if(error.status === 404) {        
            this.route.navigateByUrl('/not-found',);
          }            
          
          if(error.status === 500) {            
            this.route.navigateByUrl('/server-error');
          }
            
        }
        return throwError(() => error);
      })
    );
  }
}
