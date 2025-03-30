import { createSelector } from 'reselect';
const authSelect = (state) => state.auth;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = createSelector([selectAuth], (auth) => auth.current);

export const isLoggedIn = createSelector([selectAuth], (auth) => auth.isLoggedIn);
