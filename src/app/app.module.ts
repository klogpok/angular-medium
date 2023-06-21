import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LayoutHeaderModule } from '@shared/modules/layoutHeader/layout-header.module';
import { AuthInterceptor } from '@shared/services/authInterceptor.service';
import { PersistenceService } from '@shared/services/persistence.service';
import { GlobalFeedModule } from './global-feed/global-feed.module';
import { LayoutFooterModule } from '@shared/modules/LayoutFooter/layout-footer.module';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { YourFeedModule } from './your-feed/your-feed.module';
import { TagFeedModule } from './tag-feed/tag-feed.module';
import { ArticleModule } from './article/article.module';
import { CreateArticleModule } from './create-article/create-article.module';
import { EditArticleModule } from '@editArticle/edit-article.module';
import { SettingsModule } from './settings/settings.module';
import { UserProfileModule } from './userProfile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    EffectsModule.forRoot([]),
    LayoutHeaderModule,
    LayoutFooterModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    EditArticleModule,
    ArticleModule,
    UserProfileModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [PersistenceService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
