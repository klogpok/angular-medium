import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IBackendErrors } from '@shared/types/backendErrors.interface';
import { ICreateArticleState } from '@createArticle/types/createArticleState.interface';

export const createArticleFeatureSelector = (state: IAppState): ICreateArticleState => state.createArticle;

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: ICreateArticleState): boolean => createArticleState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: ICreateArticleState): IBackendErrors | null => createArticleState.validationErrors
);
