import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

import { PersistenceService } from 'src/app/shared/services/persistence.service';

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceService.get('accessToken');

        if (!token) {
          return of(getCurrentUserFailureAction());
        }

        return this.authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError(() => of(getCurrentUserFailureAction()))
        );
      })
    )
  );
}
