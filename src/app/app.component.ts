import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { State } from './auth/store/reducers';
import { AuthActions } from './auth/store/actions/auth.action.types';
import { isLoggedIn, isLoggedOut } from './auth/auth.selector';
import { User } from './auth/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  isLoggedOut$ = this.store.pipe(select(isLoggedOut));

  constructor(
    private store: Store<any>,
    private router: Router) {

  }

  ngOnInit() {

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    const user = JSON.parse(localStorage.getItem('user')) as User;
    if (user) {
      this.store.dispatch(AuthActions.login({ user }))
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
