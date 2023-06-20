import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IArticleInput } from '@shared/types/articleInput.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: IArticleInput;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: IBackendErrors | null;

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<IArticleInput>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inintializeForm();
  }

  inintializeForm(): void {
    this.form = this.fb.group({
      ...this.initialValuesProps,
      tagList: this.initialValuesProps.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const articleInput: IArticleInput = {
      ...this.form.value,
      tagList: this.form.value.tagList.split(' '),
    };
    this.articleSubmitEvent.emit(articleInput);
  }
}
