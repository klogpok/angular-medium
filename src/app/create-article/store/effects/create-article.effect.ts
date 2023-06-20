import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { IArticle } from '@shared/types/article.interface';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '@createArticle/store/actions/create-article.action';
import { Router } from '@angular/router';
import { CreateArticleService } from '@createArticle/services/create-article.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CreateArticleEffect {
  constructor(private actions$: Actions, private router: Router, private createArticleService: CreateArticleService) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: IArticle) => {
            return createArticleSuccessAction({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(createArticleFailureAction({ errors: errorResponse.error.errors }))
          )
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/', 'articles', article.slug]);
        })
      ),
    {
      dispatch: false,
    }
  );
}
