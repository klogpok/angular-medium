import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from '@editArticle/components/edit-article/edit-article.component';
import { Route, RouterModule } from '@angular/router';
import { ArticleFormModule } from '@shared/modules/articleForm/articleForm.module';
import { EditArticleService } from './services/edit-article.service';
import { EffectsModule } from '@ngrx/effects';
import { UpdateArticleEffect } from '@editArticle/store/effects/update-article.effect';
import { StoreModule } from '@ngrx/store';
import { editArticleReducer } from '@editArticle/store/reducers';
import { ArticleService as SharedArticleService } from '@shared/services/article.service';
import { GetArticleEffect } from './store/effects/get-article.effect';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { BackendErrorMessagesModule } from '@shared/modules/backendErrorMessages/backendErrorMessages.module';

const routes: Route[] = [{ path: 'articles/:slug/edit', component: EditArticleComponent }];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    StoreModule.forFeature('editArticle', editArticleReducer),
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    LoadingModule,
    BackendErrorMessagesModule,
  ],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
