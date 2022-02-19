import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { User } from '../../model/user.model';
import { AuthActions } from '../actions/auth.action.types';

export const authFeatureKey = 'auth';

export interface State {
  user: User
};

export const initState: State = {
  user: undefined
};

export const authReducer = createReducer(
  initState,
  on(AuthActions.login, (state, action) => ({ ...state, user: action.user })),
  on(AuthActions.logout, (state, action) => ({ ...state, user: undefined }))
);
