import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class VerifyJwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private route: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken() || '';

    if (!accessToken) {
      return next.handle(request);
    }

    if (this.tokenExpired(accessToken)) {
      return this.authService.refreshAccessToken(refreshToken).pipe(
        tap((res) => {
          this.authService.setAccessToken(res.access);
        }),
        switchMap((res) => {
          return next.handle(this.addTokenHeader(request, res.access));
        }),
        catchError((error) => {
          const ERROR_CODES = [401, 403];
          if (
            error instanceof HttpErrorResponse &&
            ERROR_CODES.includes(error.status)
          ) {
            this.route.navigate(['login']);
            localStorage.clear();
          }
          return throwError(error);
        })
      );
    }

    // mean token isn't expired
    return next.handle(this.addTokenHeader(request, accessToken));
  }

  private tokenExpired(token: string): boolean {
    const expiry: number = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
