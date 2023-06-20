import { createReducer, on } from '@ngrx/store';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from './actions/getFeed.action';
import { IFeedState } from '../types/feedState.interface';
import { routerNavigatedAction } from '@ngrx/router-store';

export const initialState: IFeedState = {
  isLoading: false,
  error: null,
  data: null,
};

export const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): IFeedState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFeedSuccessAction,
    (state, action): IFeedState => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })
  ),
  on(
    getFeedFailureAction,
    (state): IFeedState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigatedAction, (): IFeedState => initialState)
);
