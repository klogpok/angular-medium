import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IProfile } from '@shared/types/profile.interface';
import { IGetUserProfileResponse } from '../types/getUserProfileResponse';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<IProfile> {
    const fullUrl = `${environment.apiUrl}/profiles/${username}`;

    return this.http
      .get<IGetUserProfileResponse>(fullUrl)
      .pipe(map((response: IGetUserProfileResponse) => response.profile));
  }
}
