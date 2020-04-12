import { ErrorHandler, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logger: NGXLogger, private snackBar: MatSnackBar) {}
  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.logger.info(err);
      this.snackBar
        .open(
          `Unauthorized! check your username or passowrd and try agian`,
          'dismiss',
          { duration: 5000 }
        )
        .dismissWithAction();
    }
  }
}
