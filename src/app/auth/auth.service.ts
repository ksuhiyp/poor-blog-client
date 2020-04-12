import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserLoginInterface } from './user-login.interface';
import { Observable } from 'rxjs';
import { AccessToken } from './access-token.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient
  ) {}
  private token: string;
  get bearerToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('Authentication');
    }
  }
  set bearerToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('Authentication', token);
      this.token = token;
    }
  }

  login(
    credentials: UserLoginInterface
  ): Observable<HttpResponse<AccessToken>> {
    return this.http.post<HttpResponse<AccessToken>>('auth/login', credentials);
  }
}
