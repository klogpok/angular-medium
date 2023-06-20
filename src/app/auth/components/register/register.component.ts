import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerAction } from '../../store/actions/register.action';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '@shared/types/appState.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { IRegisterRequest } from '../../types/registerRequest.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    const request: IRegisterRequest = {
      user: this.form.value,
    };
    this.store.dispatch(registerAction({ request }));
  }
}
