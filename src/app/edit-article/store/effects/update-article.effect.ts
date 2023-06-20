import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { IArticle } from '@shared/types/article.interface';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EditArticleService } from '@editArticle/services/edit-article.service';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '../actions/update-article.action';

@Injectable()
export class UpdateArticleEffect {
  constructor(private actions$: Actions, private router: Router, private editArticleService: EditArticleService) {}

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ slug, articleInput }) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: IArticle) => {
            return updateArticleSuccessAction({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(updateArticleFailureAction({ errors: errorResponse.error.errors }))
          )
        );
      })
    )
  );

  redirectAfterEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {
      dispatch: false,
    }
  );
}
