import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { EffectsModule } from '@ngrx/effects';
import { FeedService } from './services/feed.service';
import { StoreModule } from '@ngrx/store';
import { feedReducer } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../errorMessage/error-message.module';
import { LoadingModule } from '../loading/loading.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TagListModule } from '../tag-list/tag-list.module';
import { AddToFavoritesModule } from '../add-to-favorites/addToFavorites.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('feed', feedReducer),
    EffectsModule.forFeature([GetFeedEffect]),
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
