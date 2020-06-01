import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot, Router, NavigationStart } from '@angular/router';
import { ArticleService } from './article.service';
import { Article } from './article';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<Article> {
  constructor(private service: ArticleService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data = this.router.getCurrentNavigation().extras.state as Article;
    if (data) {
      return of(data);
    } else if (route.paramMap.has('slug')) {
      return this.service.getArticle(route.paramMap.get('slug'));
    } else {
      return this.service.getArticle(route.paramMap.get('id'));
    }
  }
}
