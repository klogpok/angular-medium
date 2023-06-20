import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { IArticle } from '@shared/types/article.interface';
import { ArticleService as SharedArticleService } from '@shared/services/article.service';
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from '../actions/get-article.action';

@Injectable()
export class GetArticleEffect {
  constructor(private actions$: Actions, private sharedArticleService: SharedArticleService) {}

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: IArticle) => {
            return getArticleSuccessAction({ article });
          }),
          catchError(() => of(getArticleFailureAction()))
        );
      })
    )
  );
}
