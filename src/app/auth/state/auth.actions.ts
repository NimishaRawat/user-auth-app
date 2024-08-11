import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const checkUser = createAction(
  '[Auth] Check User',
  props<{ emailOrPhone: string }>()
);

export const checkUserSuccess = createAction(
  '[Auth] Check User Success',
  props<{ isExistingUser: boolean }>()
);

export const checkUserFailure = createAction(
  '[Auth] Check User Failure',
  props<{ error: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ emailOrPhone: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ user: User }>()
);

export const signupStep = createAction(
  '[Auth] Signup Step',
  props<{ step: number }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);
