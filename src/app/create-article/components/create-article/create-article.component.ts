import { Component, OnInit } from '@angular/core';
import { createArticleAction } from '@createArticle/store/actions/create-article.action';
import { isSubmittingSelector, validationErrorsSelector } from '@createArticle/store/selectors';
import { Store, select } from '@ngrx/store';
import { IArticleInput } from '@shared/types/articleInput.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: IArticleInput = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: IArticleInput) {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
