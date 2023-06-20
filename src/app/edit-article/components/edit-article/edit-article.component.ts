import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from '@editArticle/store/actions/get-article.action';
import { updateArticleAction } from '@editArticle/store/actions/update-article.action';
import { articleSelector, isSubmittingSelector, validationErrorsSelector } from '@editArticle/store/selectors';
import { isLoadingSelector } from '@editArticle/store/selectors';
import { Store, select } from '@ngrx/store';
import { IArticle } from '@shared/types/article.interface';
import { IArticleInput } from '@shared/types/articleInput.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  slug: string;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  initialValues$: Observable<IArticleInput>;
  backendErrors$: Observable<IBackendErrors | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: IArticle) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: IArticleInput): void {
    this.store.dispatch(updateArticleAction({ slug: this.slug, articleInput }));
  }
}
