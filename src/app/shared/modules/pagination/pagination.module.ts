import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, RouterModule],
  exports: [PaginationComponent],
  providers: [UtilsService],
})
export class PaginationModule {}
