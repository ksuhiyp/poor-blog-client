import { Component, OnInit, Query } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  constructor(private articleService: ArticleService) {}
  articles: Article[];
  ngOnInit(): void {
    this.getArticles().subscribe();
  }

  getArticles(query?: Query): Observable<Article[]> {
    return this.articleService
      .getArticles(query)
      .pipe(tap((articles) => (this.articles = articles)));
  }
}
