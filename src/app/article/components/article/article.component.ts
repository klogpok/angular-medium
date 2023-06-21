import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, map, of } from 'rxjs';

import { IAppState } from '@shared/types/appState.interface';
import { IArticle } from '@shared/types/article.interface';
import { getArticleAction } from '@article/store/actions/getArticle.action';
import { articleSelector, errorSelector, isLoadingSelector } from '@article/store/selectors';
import { currentUserSelector } from '@auth/store/selectors';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { deleteArticleAction } from '@article/store/actions/deleteArticle.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: IArticle | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isAuthor$ = combineLatest<[IArticle, ICurrentUser]>([
      this.store.pipe(select(articleSelector), filter(Boolean)),
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
    ]).pipe(
      map(([article, currentUser]: [IArticle, ICurrentUser]) => {
        return article.author.username === currentUser.username;
      })
    );
  }

  initializeListeners() {
    this.articleSubscription = this.store.pipe(select(articleSelector)).subscribe((article: IArticle | null) => {
      this.article = article;
    });
  }

  fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle() {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
