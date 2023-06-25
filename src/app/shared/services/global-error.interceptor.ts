import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from './shared.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.sharedService.isLoaderEvent.next(true);
    const authReq = this.modifyRequest(request);
    return next.handle(authReq).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          this.sharedService.isLoaderEvent.next(false);
          // if(evt.body && evt.body.success)
          //     this.toastr.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
        }
      }),

      catchError((err: any) => {
        this.sharedService.isLoaderEvent.next(false);
        if (err instanceof HttpErrorResponse) {
          try {
            debugger;
            this.toastr.error(err.error.message);
          } catch (e) {
            this.toastr.error('An error occurred');
          }
          //log error
        }
        return of(err);
      })
    );
  }

  modifyRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let token: any = this.authService.getToken();
    if (this.authService.tokenExpired(token)) {
      this.authService.logOut();
    }
    if (token === undefined) {
      return request;
    } else {
      return request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      });
    }
  }
}
