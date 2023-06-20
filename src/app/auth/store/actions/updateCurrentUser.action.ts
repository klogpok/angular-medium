import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { ICurrentUserInput } from '@shared/types/currentUserInput.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';

export const updateCurrentUserAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER,
  props<{ currentUserInput: ICurrentUserInput }>()
);

export const updateCurrentUserSuccessAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_SUCCESS,
  props<{ currentUser: ICurrentUser }>()
);

export const updateCurrentUserFailureAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_FAILURE,
  props<{ errors: IBackendErrors }>()
);
