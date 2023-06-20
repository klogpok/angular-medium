import { IAppState } from '@shared/types/appState.interface';
import { IAuthState } from '../types/authState.interface';
import { createSelector } from '@ngrx/store';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

export const authFeatureSelector = (state: IAppState): IAuthState => state.auth;

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState): boolean => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState): IBackendErrors | null => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState): boolean => authState.isLoggedIn
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState): ICurrentUser => authState.currentUser
);
