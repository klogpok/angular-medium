import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IFeedState } from '../types/feedState.interface';
import { IGetFeedResponse } from '../types/getFeedResponse.interface';

export const feedFeatureSelector = (state: IAppState): IFeedState => state.feed;

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (state: IFeedState): boolean => state.isLoading
);

export const feedSelector = createSelector(
  feedFeatureSelector,
  (state: IFeedState): IGetFeedResponse => state.data
);

export const errorSelector = createSelector(
  feedFeatureSelector,
  (state: IFeedState): any => state.error
);
