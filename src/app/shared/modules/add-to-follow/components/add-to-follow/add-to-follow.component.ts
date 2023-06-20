import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { addToFollowAction } from '../../store/actions/addToFollow.action';

@Component({
  selector: 'app-add-to-follow',
  templateUrl: './add-to-follow.component.html',
  styleUrls: ['./add-to-follow.component.scss'],
})
export class AddToFollowComponent {
  @Input('isFollowed') isFollowedProps: boolean;
  @Input('profileSlug') profileSlugProps: string;

  isFollowed: boolean;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.isFollowed = this.isFollowedProps;
  }

  handleFollow() {
    this.store.dispatch(addToFollowAction({ isFollowed: this.isFollowed, slug: this.profileSlugProps }));
    this.isFollowed = !this.isFollowed;
  }
}
