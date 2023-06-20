import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IBackendErrors } from '@shared/types/backendErrors.interface';
import { IEditArticleState } from '@editArticle/types/editArticleState.interface';
import { IArticle } from '@shared/types/article.interface';

export const editArticleFeatureSelector = (state: IAppState): IEditArticleState => state.editArticle;

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState): boolean => editArticleState.isLoading
);

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState): boolean => editArticleState.isSubmitting
);

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState): IArticle => editArticleState.article
);

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: IEditArticleState): IBackendErrors | null => editArticleState.validationErrors
);
