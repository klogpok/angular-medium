import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AddToFavoritesService } from '../../services/addToFavorites.service';
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction,
} from '../actions/addToFavorites.action';
import { IArticle } from '@shared/types/article.interface';

@Injectable()
export class AddToFavoritesEffect {
  constructor(private actions$: Actions, private addToFavoritesService: AddToFavoritesService) {}

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);

        return article$.pipe(
          map((article: IArticle) => {
            return addToFavoritesSuccessAction({ article });
          }),
          catchError(() => of(addToFavoritesFailureAction()))
        );
      })
    )
  );
}
