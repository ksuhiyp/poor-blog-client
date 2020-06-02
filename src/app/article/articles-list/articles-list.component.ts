import { Component, OnInit, Query, Inject, PLATFORM_ID } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { constants } from 'src/app/shared/constants';
@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  constructor(private articleService: ArticleService, @Inject(PLATFORM_ID) private platformId: string) {}
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
}
