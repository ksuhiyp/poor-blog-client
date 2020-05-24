import { ErrorHandler, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logger: NGXLogger, private snackBar: MatSnackBar) {}
  handleError(err: HttpErrorResponse) {
    switch (err.status) {
      case 401:
      case 403:
        this.logger.info(err);
        this.snackBar
          .open(`Unauthorized!`, 'dismiss', { duration: 5000 })
          .dismissWithAction();
        break;
      case 504:
        this.logger.warn(err);
        this.snackBar
          .open('Failed to connect to server', 'dismiss', { duration: 5000 })
          .dismissWithAction();
        break;
      default:
        this.logger.fatal(err);
        this.snackBar
          .open('Somthing wrong happened', 'dismiss', { duration: 5000 })
          .dismissWithAction();
        break;
    }
  }
}
