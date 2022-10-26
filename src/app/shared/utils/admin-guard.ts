import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { HomeService } from "src/app/home/home.service";
import { AppState } from "src/app/state/app.state";
import { selectCurrentUser } from "src/app/state/users/users.selectors";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private chatService: HomeService,
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.selectUserStore().pipe(
      switchMap((result) => of(result)),
      catchError(() => of(false))
    );
  }

  selectUserStore(): Observable<boolean> {
    // return this.store.select(selectCurrentUser)
    //   .pipe(
    //     map(user => user && user.role === 'admin' || false),
    //     take(1)
    //   )

    return this.chatService.getCurrentUser()
      .pipe(
        map(user => user && user.role === 'admin' || false),
        take(1)
      )
  }
}