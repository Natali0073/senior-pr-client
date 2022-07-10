import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        map(res => {
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
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
