import { createReducer, on } from '@ngrx/store';
import {
  checkUserSuccess,
  checkUserFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  signupStep,
} from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(checkUserSuccess, (state, { isExistingUser }) => ({
    ...state,
    isExistingUser,
    error: null,
  })),
  on(checkUserFailure, (state, { error }) => ({
    ...state,
    isExistingUser: false,
    error,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    step: 1,
  })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(signupStep, (state, { step }) => ({
    ...state,
    step,
  })),
);
