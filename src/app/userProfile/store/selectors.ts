import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IUserProfileState } from '../types/userProfileState.interface';
import { IProfile } from '@shared/types/profile.interface';

export const userProfileFeatureSelector = (state: IAppState): IUserProfileState => state.userProfile;

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState): boolean => userProfileState.isLoading
);

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState): IProfile | null => userProfileState.data
);

export const validationErrorsSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: IUserProfileState): string | null => userProfileState.errors
);
