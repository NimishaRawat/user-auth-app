import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { checkUser, checkUserSuccess, checkUserFailure, login, loginSuccess, loginFailure, signup, signupSuccess, signupFailure } from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  checkUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkUser),
      mergeMap(action =>
        this.authService.checkUserExistence(action.emailOrPhone).pipe(
          map(isExistingUser => checkUserSuccess({ isExistingUser })),
          catchError(error => of(checkUserFailure({ error: 'User check failed.' })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.authService.validateUser(action.emailOrPhone, action.password).pipe(
          map(user => {
            if (user) {
              return loginSuccess({ user });
            } else {
              return loginFailure({ error: 'Invalid credentials' });
            }
          }),
          catchError(error => of(loginFailure({ error: 'Invalid login credentials.' })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(action =>
        this.authService.createUser(action.user).pipe(
          map(user => signupSuccess({ user })),
          catchError(error => of(signupFailure({ error: 'Signup failed.' })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
