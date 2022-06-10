import { BusyService } from './../services/busy.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, Observable, finalize } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.method === 'POST' && request.url.includes('orders')) {
      return next.handle(request);
    }

    if(request.method === 'DELETE') {
      return next.handle(request);
    }

    if (request.url.includes('email')) {
      return next.handle(request);
    }
    
    this.busyService.busy();
    return next.handle(request).pipe(      
      finalize(
        () => this.busyService.idle()      
      )
    );
  }
}
