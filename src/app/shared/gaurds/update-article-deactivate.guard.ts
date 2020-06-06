import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UpdateArticleComponent } from 'src/app/article/update-article/update-article.component';

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleDeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: UpdateArticleComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }
}
