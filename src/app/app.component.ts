import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private artivatedRoute: ActivatedRoute, private dialog: MatDialog, private router: Router) {}
  title = 'poor-blog-client';
  isOnArticlePost;

  ngOnInit(): void {}

  openAddArticleModal() {
    const dialogRef = this.dialog.open(CreateArticleComponent, { width: '400px', data: {} });
    dialogRef
      .afterClosed()
      .pipe(tap(() => this.router.navigate(['article', 'edit', dialogRef.componentInstance.article.id])))
      .subscribe();
  }
}
