import { createReducer, on } from '@ngrx/store';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.action';
import { IAuthState } from '../types/authState.interface';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/getCurrentUser.action';
import { updateCurrentUserSuccessAction } from './actions/updateCurrentUser.action';
import { logoutAction } from './actions/sync.action';

export const initialState: IAuthState = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
      currentUser: null,
    })
  ),
  on(
    loginAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
      currentUser: null,
    })
  ),
  on(
    getCurrentUserAction,
    (state): IAuthState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): IAuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    logoutAction,
    (): IAuthState => ({
      ...initialState,
      isLoggedIn: false,
    })
  )
);
