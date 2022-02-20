import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { CourseActions } from '../action-types';
import { compareCourses, Course } from '../model/course';



// old way
// export interface AuthState {
//   entities: { [key: number]: Course }
//   ids: number[]
// }

export interface CoursesState extends EntityState<Course> {
  coursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
  coursesLoaded: false
});

export const courseReducer = createReducer(

  initialCoursesState,

  on(CourseActions.allCoursesLoaded, (state, action) => adapter.setAll(action.courses, { ...state, coursesLoaded: true })),
  on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state)),

);


export const { selectAll } = adapter.getSelectors();

