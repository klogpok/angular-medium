import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { IGetPopularTagsResponse } from '../types/getPopularTagsResponse.interface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const fullUrl = environment.apiUrl + '/tags';

    return this.http.get(fullUrl).pipe(
      map((response: IGetPopularTagsResponse) => {
        return response.tags;
      })
    );
  }
}
