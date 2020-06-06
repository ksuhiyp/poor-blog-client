import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { tap, share, shareReplay, map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Observable, of, noop } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private artivatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}
  title = 'poor-blog-client';
  isOnArticlePost;
  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.isLoggedIn();
  }

  openAddArticleModal() {
    const dialogRef = this.dialog.open(CreateArticleComponent, { width: '400px', data: {} });
    dialogRef
      .afterClosed()
      .pipe(
        tap(() =>
          dialogRef.componentInstance.article
            ? this.router.navigate(['/article', 'edit', dialogRef.componentInstance.article.id], {
                state: { data: dialogRef.componentInstance.article },
              })
            : noop()
        )
      )
      .subscribe();
  }

  private isLoggedIn(): Observable<boolean> {
    return (this.isLoggedIn$ = this.authService.isLoggedIn());
  }
}
