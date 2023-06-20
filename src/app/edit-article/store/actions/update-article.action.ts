import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { IArticle } from '@shared/types/article.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';
import { IArticleInput } from '@shared/types/articleInput.interface';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ slug: string; articleInput: IArticleInput }>()
);
export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: IArticle }>()
);
export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: IBackendErrors }>()
);
