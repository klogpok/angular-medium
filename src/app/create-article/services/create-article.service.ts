import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IArticle } from '@shared/types/article.interface';
import { IArticleInput } from '@shared/types/articleInput.interface';
import { ISaveArticleResponse } from '@shared/types/saveArticleResponse.interface';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(articleInput: IArticleInput): Observable<IArticle> {
    const fullUrl = `${environment.apiUrl}/articles`;
    return this.http
      .post<ISaveArticleResponse>(fullUrl, { article: articleInput })
      .pipe(map((response: ISaveArticleResponse) => response.article));
  }
}
