import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ISettingsState } from '../types/settingsState.interface';

export const settingsFeatureSelector = (state: IAppState): ISettingsState => state.settings;

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: ISettingsState): boolean => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: ISettingsState): IBackendErrors | null => settingsState.validationErrors
);
