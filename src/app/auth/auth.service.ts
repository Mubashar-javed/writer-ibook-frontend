import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginRequest,
  LoginResponse,
  ParsedJWT,
  TOKEN_KEYS,
} from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = environment.baseURL + '/auth/login/';
    return this.http.post<LoginResponse>(url, credentials).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, response.access);
        localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, response.refresh);
      })
    );
  }

  refreshAccessToken(refreshToken: string): Observable<LoginResponse> {
    const url = environment.baseURL + '/auth/refresh/';
    return this.http.post<LoginResponse>(url, {
      refresh: refreshToken,
    });
  }

  logout() {
    const url = environment.baseURL + '/auth/logout/';
    return this.http
      .post(url, {
        refresh: this.getRefreshToken(),
      })
      .pipe(
        tap(() => {
          localStorage.clear();
        })
      );
  }

  getAccessToken() {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  }

  setAccessToken(token: string) {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
  }

  getUser(): ParsedJWT | null {
    const accessToken = this.getAccessToken();
    if (!accessToken) return null;

    return JSON.parse(atob(accessToken.split('.')[1]));
  }
}
