import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BusyIndicatorService } from '../components/busy-indicator/service/busy-indicator.service';

@Injectable()
export class RequestHandlingInterceptor implements HttpInterceptor {
  constructor(private busyIndicatorService: BusyIndicatorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request && this.busyIndicatorService.show();
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          event instanceof HttpResponse && this.busyIndicatorService.hide();
        },
        (error) => {
          error instanceof HttpErrorResponse && this.busyIndicatorService.hide();
        }
      )
    );
  }
}
