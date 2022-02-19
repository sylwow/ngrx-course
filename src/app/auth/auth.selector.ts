import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, State } from "./store/reducers";

export const selectAuth = createFeatureSelector<State>(
  authFeatureKey
)

export const isLoggedIn = createSelector(
  selectAuth,
  auth => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
