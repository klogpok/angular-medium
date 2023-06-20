import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './components/articleForm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesModule } from '@shared/modules/backendErrorMessages/backendErrorMessages.module';
import { TagListModule } from '@shared/modules/tag-list/tag-list.module';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule, TagListModule],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
