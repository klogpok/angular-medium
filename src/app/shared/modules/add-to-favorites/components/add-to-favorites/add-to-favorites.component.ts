import { isLoggedInSelector } from '@auth/store/selectors';
import { addToFavoritesAction } from '../../store/actions/addToFavorites.action';
import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('favoritesCount') favoritesCountProps: number;
  @Input('articleSlug') articleSlugProps: string;
  @Input('isWideBtn') isWideBtnProps: boolean = false;

  isFavorited: boolean;
  favoritesCount: number;
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isFavorited = this.isFavoritedProps;
    this.favoritesCount = this.favoritesCountProps;
  }

  initializeListeners(): void {
    this.isLoggedInSubscription = this.store
      .pipe(select(isLoggedInSelector))
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
  }

  handleLike() {
    if (!this.isLoggedIn) {
      return;
    }

    this.store.dispatch(addToFavoritesAction({ isFavorited: this.isFavorited, slug: this.articleSlugProps }));

    this.favoritesCount += this.isFavorited ? -1 : 1;
    this.isFavorited = !this.isFavorited;
  }
}
