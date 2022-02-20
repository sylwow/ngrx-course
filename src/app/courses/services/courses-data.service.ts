import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesHttpService } from './courses-http.service';

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

  constructor(
    private coursesHttpService: CoursesHttpService,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator) {
    super('Course', http, httpUrlGenerator);
  }

  getAll(): Observable<Course[]> {
    return this.coursesHttpService.findAllCourses();
    // return this.http.get('/api/courses')
    //   .pipe(
    //     map(res => res['payload'])
    //   );
  }
}
