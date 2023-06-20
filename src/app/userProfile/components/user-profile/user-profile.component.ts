import { getUserProfileAction } from './../../store/actions/getUserProfile.action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { currentUserSelector } from '@auth/store/selectors';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { IProfile } from '@shared/types/profile.interface';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { isLoadingSelector, userProfileSelector, validationErrorsSelector } from '../../store/selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  username: string;
  userProfile: IProfile;
  userProfileSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  initializeValues() {
    this.username = this.route.snapshot.paramMap.get('username');

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(validationErrorsSelector));
    this.apiUrl = this.getApiUrl();

    this.isCurrentUserProfile$ = combineLatest<[IProfile, ICurrentUser]>([
      this.store.pipe(select(userProfileSelector), filter(Boolean)),
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
    ]).pipe(
      map(([userProfile, currentUser]: [IProfile, ICurrentUser]) => {
        return userProfile.username === currentUser.username;
      })
    );
  }

  initializeListeners() {
    this.userProfileSubscription = this.store.pipe(select(userProfileSelector)).subscribe((userProfile: IProfile) => {
      this.userProfile = userProfile;
    });

    this.route.params.subscribe((params: Params) => {
      this.username = params.username;
      this.apiUrl = this.getApiUrl();
      this.fetchData();
    });
  }

  fetchData() {
    this.store.dispatch(getUserProfileAction({ username: this.username }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites ? `/articles?favorited=${this.username}` : `/articles?author=${this.username}`;
  }
}
