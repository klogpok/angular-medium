import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/getPopularTags.action';
import { PopularTagsService } from '../../services/popular-tags.service';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}

  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),
          catchError(() => of(getPopularTagsFailureAction()))
        );
      })
    )
  );
}
