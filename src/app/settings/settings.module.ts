import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './store/reducers';
import { BackendErrorMessagesModule } from '@shared/modules/backendErrorMessages/backendErrorMessages.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: 'settings', component: SettingsComponent }];

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
