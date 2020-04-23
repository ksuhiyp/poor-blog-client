import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}
  article: Partial<Article> = {};
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params) => (this.article.slug = params.slug)),
        switchMap(() => this.getArticle(this.article.slug))
      )
      .subscribe();
  }

  private getArticle(slug) {
    return this.articleService
      .getArticle(slug)
      .pipe(tap((res) => (this.article = res)));
  }
}
