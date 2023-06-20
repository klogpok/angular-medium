import { createReducer, on } from '@ngrx/store';
import { IPopularTagsState } from '../types/popularTagsState.interface';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from './actions/getPopularTags.action';

export const initialState: IPopularTagsState = {
  isLoading: false,
  data: null,
  error: null,
};

export const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): IPopularTagsState => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: false,
    })
  )
);
