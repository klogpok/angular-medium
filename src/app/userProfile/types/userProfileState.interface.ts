import { IProfile } from '@shared/types/profile.interface';

export interface IUserProfileState {
  isLoading: boolean;
  data: IProfile | null;
  errors: string | null;
}
