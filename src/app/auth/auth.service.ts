import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserLoginInterface } from './user-login.interface';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AccessToken } from './access-token.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient
  ) {}

  public get bearerToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('Authentication');
    }
  }
  public set bearerToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('Authentication', token);
      this.token = token;
    }
  }

  login(credentials: UserLoginInterface): Observable<AccessToken> {
    return this.http.post<AccessToken>('auth/login', credentials).pipe(
      tap((res) => {
        this.bearerToken = res.access_token;
      })
    );
  }
}
