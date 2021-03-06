import { Component, OnInit, Query, Inject, PLATFORM_ID } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Observable, empty } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { constants } from 'src/app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    @Inject(PLATFORM_ID) private platformId: string,
    private matDialog: MatDialog,
    private logger: MatSnackBar
  ) {}
  articles: Article[];
  atemptee = localStorage.getItem('id');
  defaultArticleImg = constants.defaultArticleImg;
  ngOnInit(): void {
    this.getArticles().subscribe();
  }

  getArticles(query?: Query): Observable<Article[]> {
    return this.articleService.getArticles(query).pipe(tap((articles) => (this.articles = articles)));
  }
  canEditArticle(article: Article): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!(+this.atemptee === article.author?.id);
    }
    return false;
  }

  async deleteArticle(article: Article) {
    const dialogRef = this.matDialog.open<ConfirmationDialogComponent<Article>>(ConfirmationDialogComponent, {
      data: { dismiss: 'No', confirm: 'DELETE', title: article.title, action: 'Delete' },
    });
    dialogRef
      .afterClosed()
      .pipe(
        switchMap((res) => {
          if (res) {
            return this.articleService.deleteArticle(article.id);
          } else {
            // tslint:disable-next-line: deprecation
            return empty();
          }
        }),
        tap((res) => {
          if (res.ok) {
            this.logger.open('Article Deleted');
            this.removeArticle(res.body.id);
          } else {
            this.logger.open('Article deletion failed');
          }
        })
      )
      .subscribe();
  }

  removeArticle(articleId) {
    const articleIndex = this.articles.findIndex((article) => article.id === articleId);
    this.articles.splice(articleIndex, 1);
  }
}
