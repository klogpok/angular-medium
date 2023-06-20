import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileService } from './services/user-profile.service';
import { EffectsModule } from '@ngrx/effects';
import { GetUserProfileEffect } from './store/effects/getUserProfile.effect';
import { userProfileReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { FeedModule } from '@shared/modules/feed/feed.module';
import { AddToFollowModule } from '@shared/modules/add-to-follow/addToFollow.module';

const routes: Routes = [
  { path: 'profiles/:username', component: UserProfileComponent },
  { path: 'profiles/:username/favorites', component: UserProfileComponent },
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', userProfileReducer),
    FeedModule,
    AddToFollowModule,
  ],
  exports: [],
  providers: [UserProfileService],
})
export class UserProfileModule {}
