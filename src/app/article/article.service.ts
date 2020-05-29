import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpUploadProgressEvent } from '@angular/common/http';
import { Article, CreateArticleDTO } from './article';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { Tags, DeleteArticleImagesDTO, Image } from '../shared/models/shared.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  // Get an article

  getArticle(slugOrId: string | number): Observable<Article> {
    return this.http.get<Article>(`article/${slugOrId}`);
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

  getAvailableTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`tag`);
  }

  postArticle(article: CreateArticleDTO): Observable<Article> {
    return this.http.post<Article>('article', article);
  }
  // Update an article

  putArticle(data: Partial<Article>, articleId): Observable<Article> {
    return this.http.put<Article>(`article/${articleId}`, data);
  }

  patchArticlePoster(data: FormData, articleId: number): Observable<any> {
    return this.http.patch(`article/${articleId}/poster`, data, { reportProgress: true, observe: 'events', responseType: 'json' });
  }
  // Delete an article

  deleteArticleImages(articleId, imagesToDelete: Image[]): Observable<Article> {
    const options = {
      headers: new HttpHeaders({}),
      body: { imagesToDelete },
    };

    return this.http.delete<Article>(`article/${articleId}/images`, options);
  }
}
