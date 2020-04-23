import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  // Get an article

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`article/${slug}`);
  }
  // Get articles
  // Create an article
  // Update an article
  // Delete an article
}
