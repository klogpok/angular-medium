import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IArticle } from '@shared/types/article.interface';
import { IGetArticleResponse } from '@shared/types/getArticleResponse';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<IArticle> {
    const url = this.getUrl(slug);
    return this.http.post(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<{}> {
    const url = this.getUrl(slug);
    return this.http.delete(url).pipe(map(this.getArticle));
  }

  getUrl(slug: string) {
    return environment.apiUrl + `/articles/${slug}/favorite`;
  }

  getArticle(response: IGetArticleResponse): IArticle {
    return response.article;
  }
}
