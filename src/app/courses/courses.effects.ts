import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";


@Injectable()
export class CoursesEffects {

  // loadCourses$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(CourseActions.loadAllCourses),
  //     concatMap(_ => this.coursesHttpService.findAllCourses().pipe(
  //       catchError(error => of([]))
  //     )),
  //     map(courses => CourseActions.allCoursesLoaded({ courses }))
  //   )
  // );

  // saveCourse$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(CourseActions.courseUpdated),
  //     concatMap(({ update }) => this.coursesHttpService.saveCourse(update.id, update.changes).pipe(
  //       catchError(error => of({}))
  //     ))
  //   ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService) { }
}
