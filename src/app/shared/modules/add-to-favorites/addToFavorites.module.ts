import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesService } from './services/addToFavorites.service';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component';
import { AddToFavoritesEffect } from './store/effects/addToFavorites.effect';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
