import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IArticleState } from '@article/types/articleState.interface';
import { IArticle } from '@shared/types/article.interface';

export const actionFeatureSelector = (state: IAppState): IArticleState => state.article;

export const isLoadingSelector = createSelector(
  actionFeatureSelector,
  (state: IArticleState): boolean => state.isLoading
);

export const articleSelector = createSelector(actionFeatureSelector, (state: IArticleState): IArticle => state.data);

export const errorSelector = createSelector(actionFeatureSelector, (state: IArticleState): any => state.error);
