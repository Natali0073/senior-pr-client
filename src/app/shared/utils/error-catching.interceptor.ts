import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { redirectionIsAvailable } from './utils';
import { customErrorHandling } from './customErrorHandling';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if ((error.status === 403 || error.status === 401) && redirectionIsAvailable(request)) {
            let message = customErrorHandling(error);
            if (message) {
              this._snackBar.openFromComponent(SnackBarComponent, {
                data: message,
                panelClass: 'snack-bar-error'
              });
            }
            this.router.navigate(['/login']);
            return throwError(error);
          }

          this._snackBar.openFromComponent(SnackBarComponent, {
            data: error.error.message,
            panelClass: 'snack-bar-error'
          });
          return throwError(error);
        })
      )
  }
}
