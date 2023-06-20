import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { IAppState } from '@shared/types/appState.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
