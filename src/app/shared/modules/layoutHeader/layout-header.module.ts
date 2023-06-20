import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutHeaderComponent],
})
export class LayoutHeaderModule {}
