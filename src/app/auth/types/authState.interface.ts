import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

export interface IAuthState {
  isLoading: boolean;
  isSubmitting: boolean;
  currentUser: ICurrentUser | null;
  isLoggedIn: boolean;
  validationErrors: IBackendErrors | null;
}
