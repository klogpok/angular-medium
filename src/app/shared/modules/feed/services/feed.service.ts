import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IGetFeedResponse } from '../types/getFeedResponse.interface';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<IGetFeedResponse> {
    const fullUrl = environment.apiUrl + url;

    return this.http.get<IGetFeedResponse>(fullUrl);
  }
}
