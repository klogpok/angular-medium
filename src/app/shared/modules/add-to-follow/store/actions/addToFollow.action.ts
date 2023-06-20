import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { IProfile } from '@shared/types/profile.interface';

export const addToFollowAction = createAction(
  ActionTypes.ADD_TO_FOLLOW,
  props<{ isFollowed: boolean; slug: string }>()
);

export const addToFollowActionSuccessAction = createAction(
  ActionTypes.ADD_TO_FOLLOW_SUCCESS,
  props<{ profile: IProfile }>()
);

export const addToFollowActionFailureAction = createAction(ActionTypes.ADD_TO_FOLLOW_FAILURE);
