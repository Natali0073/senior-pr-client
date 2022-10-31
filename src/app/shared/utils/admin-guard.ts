import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { iif, Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take } from "rxjs/operators";
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
    this.getUserRole();
    return this.getUserRole().pipe(
      switchMap((result) => of(!!result)),
      catchError(() => of(false))
    );
  }

  getUserRole() {
    // check data from the store
    // if user is absent, fetch data from server
    return this.store.select(selectCurrentUser)
      .pipe(
        map(userData => userData),
        mergeMap(userData => iif(() => !userData.role, this.fetchUserData(), of(userData && userData.role === 'admin' || false))),
        take(1)
      )

  }

  fetchUserData() {
    return this.chatService.getCurrentUser()
      .pipe(
        map(user => user && user.role === 'admin' || false),
        take(1)
      )
  }
}