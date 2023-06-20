import { IGetUserProfileResponse } from './../../../../userProfile/types/getUserProfileResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IProfile } from '@shared/types/profile.interface';

@Injectable()
export class AddToFollowService {
  constructor(private http: HttpClient) {}

  addToFollow(slug: string): Observable<IProfile> {
    const url = this.getUrl(slug);
    return this.http.post(url, {}).pipe(map(this.getProfile));
  }

  removeFromFollow(slug: string): Observable<{}> {
    const url = this.getUrl(slug);
    return this.http.delete(url).pipe(map(this.getProfile));
  }

  getUrl(slug: string) {
    return environment.apiUrl + `/profiles/${slug}/follow`;
  }

  getProfile(response: IGetUserProfileResponse): IProfile {
    return response.profile;
  }
}
