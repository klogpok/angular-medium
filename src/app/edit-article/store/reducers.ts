import { createReducer, on } from '@ngrx/store';

import { IEditArticleState } from '@editArticle/types/editArticleState.interface';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from './actions/update-article.action';
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from './actions/get-article.action';

export const initialState: IEditArticleState = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

export const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): IEditArticleState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): IEditArticleState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): IEditArticleState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getArticleAction,
    (state): IEditArticleState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): IEditArticleState => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): IEditArticleState => ({
      ...state,
      isLoading: false,
    })
  )
);
