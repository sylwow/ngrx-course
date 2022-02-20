import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, finalize, first, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { loadAllCourses } from './course.actions';
import { areCoursesLoded, selectAllCourses } from './course.selectors';
import { Course } from './model/course';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      switchMap(_ => this.store.select(areCoursesLoded)),
      tap(loaded => {
        if (!loaded && !this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter(loaded => loaded),
      first(),
      finalize(() => this.loading = false)
    );
  }
}
