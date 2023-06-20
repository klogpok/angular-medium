import { IAuthState } from 'src/app/auth/types/authState.interface';
import { IFeedState } from '../modules/feed/types/feedState.interface';
import { IPopularTagsState } from '../modules/popular-tags/types/popularTagsState.interface';
import { IArticleState } from 'src/app/article/types/articleState.interface';
import { ICreateArticleState } from '@createArticle/types/createArticleState.interface';
import { IEditArticleState } from '@editArticle/types/editArticleState.interface';
import { ISettingsState } from 'src/app/settings/types/settingsState.interface';
import { IUserProfileState } from 'src/app/userProfile/types/userProfileState.interface';

export interface IAppState {
  auth: IAuthState;
  feed: IFeedState;
  popularTags: IPopularTagsState;
  article: IArticleState;
  createArticle: ICreateArticleState;
  editArticle: IEditArticleState;
  settings: ISettingsState;
  userProfile: IUserProfileState;
}
