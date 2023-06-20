import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors';
import { IAppState } from '@shared/types/appState.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent {
  isLoggedIn$: Observable<boolean | null>;
  currentUser$: Observable<ICurrentUser | null>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
