import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './store/reducers';
import { BackendErrorMessagesModule } from '@shared/modules/backendErrorMessages/backendErrorMessages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { authGuard } from '@auth/guards/auth.guard';

const routes: Routes = [{ path: '', component: SettingsComponent, canMatch: [authGuard] }];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', settingsReducer),
    BackendErrorMessagesModule,
  ],
})
export class SettingsModule {}
