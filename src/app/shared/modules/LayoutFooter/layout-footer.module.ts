import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutFooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutFooterComponent],
})
export class LayoutFooterModule {}
