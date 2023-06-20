import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/getFeed.action';
import { FeedService } from '../../services/feed.service';
import { IGetFeedResponse } from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
  constructor(private actions$: Actions, private feedService: FeedService) {}

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: IGetFeedResponse) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError(() => of(getFeedFailureAction()))
        );
      })
    )
  );
}
