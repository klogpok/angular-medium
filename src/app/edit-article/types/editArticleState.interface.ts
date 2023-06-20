import { IArticle } from '@shared/types/article.interface';
import { IBackendErrors } from '@shared/types/backendErrors.interface';

export interface IEditArticleState {
  isLoading: boolean;
  article: IArticle | null;
  isSubmitting: boolean;
  validationErrors: IBackendErrors | null;
}
