import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UserLoginInterface } from './user-login.interface';
import { Observable } from 'rxjs';
import { catchError, map, first, tap } from 'rxjs/operators';
import { AccessToken } from './access-token.interface';
import { InternalErrorHandler } from '../shared/internal-error-handler';
import { UserData } from '../shared/models/shared.models';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient, private errorHandler: InternalErrorHandler) {}

  login(credentials: UserLoginInterface): Observable<UserData> {
    return this.http.post<UserData>('auth/login', credentials).pipe(
      tap((user) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('username', user.username);
          localStorage.setItem('id', user.id.toString());
        }
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.http
      .head<HttpResponse<null>>('auth/session', {
        observe: 'response',
        headers: new HttpHeaders({ 'Cache-Control': 'no-cache' }),
      })
      .pipe(
        catchError(this.errorHandler.handleError<HttpResponse<boolean>>('isLoggedIn', new HttpResponse({ status: 401 }))),
        first(),
        map((res) => {
          return res.ok;
        })
      );
  }
}
