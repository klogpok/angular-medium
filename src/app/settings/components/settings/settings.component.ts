import { updateCurrentUserAction } from './../../../auth/store/actions/updateCurrentUser.action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@shared/types/appState.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';
import { Observable, Subscription, filter } from 'rxjs';
import { ICurrentUser } from '@shared/types/currentUser.interface';
import { currentUserSelector } from '@auth/store/selectors';
import { ICurrentUserInput } from '@shared/types/currentUserInput.interface';
import { logoutAction } from '@auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;
  currentUser: ICurrentUser;
  currentUserSubscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeListerners();
    this.initializeValues();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeForm() {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  initializeListerners() {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: ICurrentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  onSubmit() {
    const currentUserInput: ICurrentUserInput = {
      ...this.currentUser,
      ...this.form.value,
    };

    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  onLogout() {
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
