import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IGetArticleResponse } from '@shared/types/getArticleResponse';
import { IArticle } from '@shared/types/article.interface';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<IArticle> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .get<IGetArticleResponse>(fullUrl)
      .pipe(map((response: IGetArticleResponse) => response.article));
  }
}
