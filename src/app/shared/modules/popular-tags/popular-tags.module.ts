import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { TagListModule } from '../tag-list/tag-list.module';
import { LoadingModule } from '../loading/loading.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { popularTagsReducer } from './store/reducers';
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effect';
import { PopularTagsService } from './services/popular-tags.service';
import { ErrorMessageModule } from '../errorMessage/error-message.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('popularTags', popularTagsReducer),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    TagListModule,
    LoadingModule,
    ErrorMessageModule,
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
