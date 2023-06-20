import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { articleReducer } from '@article/store/reducers';
import { GetArticleEffect } from '@article/store/effects/getArticle.effect';
import { ErrorMessageModule } from '@shared/modules/errorMessage/error-message.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { ArticleComponent } from '@article/components/article/article.component';
import { ArticleService as SharedArticleService } from '@shared/services/article.service';
import { TagListModule } from '@shared/modules/tag-list/tag-list.module';
import { DeleteArticleEffect } from '@article/store/effects/deleteArticle.effect';
import { ArticleService } from '@article/services/article.service';
import { AddToFavoritesModule } from '@shared/modules/add-to-favorites/addToFavorites.module';
import { AddToFollowModule } from '@shared/modules/add-to-follow/addToFollow.module';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', articleReducer),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
    AddToFavoritesModule,
    AddToFollowModule,
  ],
  exports: [],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
