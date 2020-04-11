import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const bearerToken = this.authService.bearerToken;

    if (bearerToken) {
      const req = request.clone({
        setHeaders: { Authorization: `Bearer ${bearerToken}` },
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
