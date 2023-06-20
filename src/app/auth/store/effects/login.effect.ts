import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

import { PersistenceService } from 'src/app/shared/services/persistence.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';

@Injectable()
export class LoginEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: ICurrentUser) => {
            this.persistenceService.set('accessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(loginFailureAction({ errors: errorResponse.error.errors }))
          )
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    {
      dispatch: false,
    }
  );
}
