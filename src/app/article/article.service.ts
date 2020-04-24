import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from './article';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { Params } from '@angular/router';

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
  // Create an article
  // Update an article
  // Delete an article
}
