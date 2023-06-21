import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../actions/updateCurrentUser.action';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UpdateCurrentUserEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: ICurrentUser) => {
            return updateCurrentUserSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(updateCurrentUserFailureAction({ errors: errorResponse.error.errors }))
          )
        );
      })
    )
  );
}
