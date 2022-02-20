import { routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('action: ', action);
    console.log('before: ', state);
    const newState = reducer(state, action);
    console.log('after: ', newState);
    return newState;
  };
}


export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [logger] : [];
