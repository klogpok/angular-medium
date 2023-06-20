import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { environment } from '@environments/environment.development';
import { IAuthResponse } from '../types/authResponse.interface';
import { ILoginRequest } from '../types/loginRequest.interface';
import { ICurrentUserInput } from '@shared/types/currentUserInput.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: IAuthResponse): ICurrentUser {
    return response.user;
  }

  register(payload: IRegisterRequest): Observable<ICurrentUser> {
    return this.http.post<IAuthResponse>(`${environment.apiUrl}/users`, payload).pipe(map(this.getUser));
  }

  login(payload: ILoginRequest): Observable<ICurrentUser> {
    return this.http.post<IAuthResponse>(`${environment.apiUrl}/users/login`, payload).pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.http.get(`${environment.apiUrl}/user`).pipe(map(this.getUser));
  }

  updateCurrentUser(currentUserInput: ICurrentUserInput): Observable<ICurrentUser> {
    return this.http.put(`${environment.apiUrl}/user`, { user: currentUserInput }).pipe(map(this.getUser));
  }
}
