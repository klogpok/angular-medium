import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ILoginRequest } from '../../types/loginRequest.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: ILoginRequest }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: ICurrentUser }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: IBackendErrors }>()
);
