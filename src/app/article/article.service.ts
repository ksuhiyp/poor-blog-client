import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, CreateArticleDTO } from './article';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { TagsList } from '../shared/models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  // Get an article

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`article/${slug}`);
  }
  getArticles(query?: Query) {
    let params: Params = {};
    if (query) {
      Object.keys(query)
        .filter((param) => !!query[param])
        .forEach((param) => (params = { param: query[param] }));
    }
    return this.http.get<Article[]>('article', params);
  }

  getAvailableTags(): Observable<TagsList[]> {
    return this.http.get<TagsList[]>(`tag`);
  }

  postArticle(article: CreateArticleDTO): Observable<Article> {
    return this.http.post<Article>('article', article);
  }
  // Update an article
  // Delete an article
}
