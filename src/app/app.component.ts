import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
