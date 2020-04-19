import { Injectable, ErrorHandler } from '@angular/core';
import { of } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class InternalErrorHandler implements ErrorHandler {
  constructor(private logger: NGXLogger, private snackBar: MatSnackBar) {}
  handleError<T>(operation?, result?: T) {
    return (err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          this.logger.error(err);
          this.snackBar
            .open(`${err.message}`, 'dismiss', { duration: 5000 })
            .dismissWithAction();
          return of(result);
        case 401:
        case 403:
          return of(err);
        default:
          this.logger.fatal(err);
          return of({ ...result });
      }
    };
  }
}
