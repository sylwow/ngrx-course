import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { CourseEntityService } from './services/course-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(
    private courseEntityService: CourseEntityService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.courseEntityService.loaded$.pipe(
      tap(loaded => !loaded && this.courseEntityService.getAll()),
      filter(loaded => loaded),
      first()
    );
  }
}
