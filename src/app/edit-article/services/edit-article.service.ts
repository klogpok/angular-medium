import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IArticle } from '@shared/types/article.interface';
import { IArticleInput } from '@shared/types/articleInput.interface';
import { ISaveArticleResponse } from '@shared/types/saveArticleResponse.interface';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(slug: string, article: IArticleInput): Observable<IArticle> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .put<ISaveArticleResponse>(fullUrl, { article })
      .pipe(map((response: ISaveArticleResponse) => response.article));
  }
}
