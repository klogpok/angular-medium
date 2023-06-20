import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserProfileService } from '../../services/user-profile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '../actions/getUserProfile.action';
import { IProfile } from '@shared/types/profile.interface';

@Injectable()
export class GetUserProfileEffect {
  constructor(private actions$: Actions, private userProfileService: UserProfileService) {}

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({ username }) => {
        return this.userProfileService.getUserProfile(username).pipe(
          map((userProfile: IProfile) => {
            return getUserProfileSuccessAction({ userProfile });
          }),
          catchError(() => of(getUserProfileFailureAction()))
        );
      })
    )
  );
}
