import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { INIT, Store } from "@ngrx/store";
import { INIT_ACTION } from "@ngrx/store-devtools/src/reducer";
import { map, switchMap, tap } from "rxjs/operators";
import { User } from "../model/user.model";
import { AuthActions } from "./actions/auth.action.types";
import { State } from "./reducers";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(auth => localStorage.setItem('user', JSON.stringify(auth.user)))
    ), { dispatch: false });

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(_ => localStorage.removeItem('user')),
      tap(_ => this.router.navigate(['/login']))
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<State>) { }
}
