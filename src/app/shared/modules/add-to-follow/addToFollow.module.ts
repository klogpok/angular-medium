import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AddToFollowService } from './services/add-to-follow.service';
import { AddToFollowComponent } from './components/add-to-follow/add-to-follow.component';
import { AddToFollowEffect } from './store/effects/addToFollow.effect';

@NgModule({
  declarations: [AddToFollowComponent],
  imports: [CommonModule, EffectsModule.forFeature([AddToFollowEffect])],
  exports: [AddToFollowComponent],
  providers: [AddToFollowService],
})
export class AddToFollowModule {}
