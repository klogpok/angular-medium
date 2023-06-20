import { addToFavoritesAction } from '../../store/actions/addToFavorites.action';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';

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

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.isFavorited = this.isFavoritedProps;
    this.favoritesCount = this.favoritesCountProps;
  }

  handleLike() {
    this.store.dispatch(addToFavoritesAction({ isFavorited: this.isFavorited, slug: this.articleSlugProps }));

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }

    this.isFavorited = !this.isFavorited;
  }
}
