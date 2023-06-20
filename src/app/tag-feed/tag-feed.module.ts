import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagFeedComponent } from './components/your-feed/tag-feed.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedModule } from '@shared/modules/feed/feed.module';
import { BannerModule } from '@shared/modules/banner/banner.module';
import { ErrorMessageModule } from '@shared/modules/errorMessage/error-message.module';
import { PopularTagsModule } from '@shared/modules/popular-tags/popular-tags.module';
import { FeedTogglerModule } from '@shared/modules/feed-toggler/feed-toggler.module';

const routes: Routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent,
  },
];

@NgModule({
  declarations: [TagFeedComponent],
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
export class TagFeedModule {}
