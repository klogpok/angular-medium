import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddToFollowService } from '../../services/add-to-follow.service';
import {
  addToFollowAction,
  addToFollowActionFailureAction,
  addToFollowActionSuccessAction,
} from '../actions/addToFollow.action';
import { IProfile } from '@shared/types/profile.interface';

@Injectable()
export class AddToFollowEffect {
  constructor(private actions$: Actions, private addToFollowService: AddToFollowService) {}

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFollowAction),
      switchMap(({ isFollowed, slug }) => {
        const profile$ = isFollowed
          ? this.addToFollowService.removeFromFollow(slug)
          : this.addToFollowService.addToFollow(slug);

        return profile$.pipe(
          map((profile: IProfile) => {
            return addToFollowActionSuccessAction({ profile });
          }),
          catchError(() => of(addToFollowActionFailureAction()))
        );
      })
    )
  );
}
