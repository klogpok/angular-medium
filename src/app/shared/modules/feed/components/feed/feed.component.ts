import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { environment } from '@environments/environment';
import queryString from 'query-string';

import { IAppState } from '@shared/types/appState.interface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { getFeedAction } from '../../store/actions/getFeed.action';
import { IGetFeedResponse } from '../../types/getFeedResponse.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<IGetFeedResponse | null>;
  subscribtions: Subscription[] = [];
  limit = environment.limit;
  baseUrl: string;
  currentPage: number;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    const isApiUrlChanged =
      !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.previousValue !== changes.apiUrlProps.currentValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners() {
    const queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params?.page ?? '1');
        this.fetchFeed();
      }
    );

    this.subscribtions.push(queryParamsSubscription);
  }

  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const urlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    this.store.dispatch(
      getFeedAction({
        url: urlWithParams,
      })
    );
  }

  unsubscribe(): void {
    for (let subscription of this.subscribtions) {
      subscription.unsubscribe();
    }
  }
}
