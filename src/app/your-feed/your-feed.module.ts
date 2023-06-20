import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourFeedComponent } from './components/your-feed/your-feed.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedModule } from '@shared/modules/feed/feed.module';
import { BannerModule } from '@shared/modules/banner/banner.module';
import { ErrorMessageModule } from '@shared/modules/errorMessage/error-message.module';
import { PopularTagsModule } from '@shared/modules/popular-tags/popular-tags.module';
import { FeedTogglerModule } from '@shared/modules/feed-toggler/feed-toggler.module';

const routes: Routes = [
  {
    path: 'feed',
    component: YourFeedComponent,
  },
];

@NgModule({
  declarations: [YourFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    ErrorMessageModule,
    PopularTagsModule,
    FeedTogglerModule,
  ],
})
export class YourFeedModule {}
