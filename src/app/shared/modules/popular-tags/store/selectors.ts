import { IAppState } from '@shared/types/appState.interface';
import { createSelector } from '@ngrx/store';
import { IPopularTagsState } from '../types/popularTagsState.interface';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

export const popularTagsFeatureSelector = (
  state: IAppState
): IPopularTagsState => state.popularTags;

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (state: IPopularTagsState): boolean => state.isLoading
);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (state: IPopularTagsState): PopularTagType[] | null => state.data
);

export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (state: IPopularTagsState): string | null => state.error
);
