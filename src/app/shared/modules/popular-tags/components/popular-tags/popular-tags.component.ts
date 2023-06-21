import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { errorSelector, isLoadingSelector, popularTagsSelector } from '../../store/selectors';
import { getPopularTagsAction } from '../../store/actions/getPopularTags.action';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  popularTags$: Observable<PopularTagType[] | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction());
  }
}
