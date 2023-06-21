import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { addToFollowAction } from '../../store/actions/addToFollow.action';
import { Subscription } from 'rxjs';
import { isLoggedInSelector } from '@auth/store/selectors';

@Component({
  selector: 'app-add-to-follow',
  templateUrl: './add-to-follow.component.html',
  styleUrls: ['./add-to-follow.component.scss'],
})
export class AddToFollowComponent implements OnInit, OnDestroy {
  @Input('isFollowed') isFollowedProps: boolean;
  @Input('profileSlug') profileSlugProps: string;

  isFollowed: boolean;
  isLoggedIn: boolean;
  isLoggedInSubscription: Subscription;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isFollowed = this.isFollowedProps;
  }

  initializeListeners(): void {
    this.isLoggedInSubscription = this.store
      .pipe(select(isLoggedInSelector))
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
  }

  handleFollow(): void {
    if (!this.isLoggedIn) {
      return;
    }

    this.store.dispatch(addToFollowAction({ isFollowed: this.isFollowed, slug: this.profileSlugProps }));
    this.isFollowed = !this.isFollowed;
  }
}
