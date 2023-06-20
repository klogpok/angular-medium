import { createReducer, on } from '@ngrx/store';
import { routerNavigatedAction } from '@ngrx/router-store';

import { IArticleState } from '@article/types/articleState.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '@article/store/actions/getArticle.action';

export const initialState: IArticleState = {
  isLoading: false,
  error: null,
  data: null,
};

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): IArticleState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): IArticleState => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): IArticleState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigatedAction, (): IArticleState => initialState)
);
