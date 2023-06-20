import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@createArticle/store/actionTypes';
import { IArticle } from '@shared/types/article.interface';
import { IArticleInput } from '@shared/types/articleInput.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';

export const createArticleAction = createAction(ActionTypes.CREATE_ARTICLE, props<{ articleInput: IArticleInput }>());
export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: IArticle }>()
);
export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: IBackendErrors }>()
);
