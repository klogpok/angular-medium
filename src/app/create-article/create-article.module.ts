import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from '@createArticle/components/create-article/create-article.component';
import { Route, RouterModule } from '@angular/router';
import { ArticleFormModule } from '@shared/modules/articleForm/articleForm.module';
import { CreateArticleService } from './services/create-article.service';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleEffect } from './store/effects/create-article.effect';
import { StoreModule } from '@ngrx/store';
import { createArticleReducer } from './store/reducers';
import { authGuard } from '@auth/guards/auth.guard';

const routes: Route[] = [{ path: 'articles/new', component: CreateArticleComponent, canMatch: [authGuard] }];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    StoreModule.forFeature('createArticle', createArticleReducer),
    EffectsModule.forFeature([CreateArticleEffect]),
  ],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
