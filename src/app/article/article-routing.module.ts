import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { AuthenticationGuard } from '../shared/gaurds/authentication.guard';
import { ArticleResolver } from './article-resolver.service';
const routes: Routes = [
  { path: 'list', component: ArticlesListComponent },
  {
    path: 'edit/:id',
    component: UpdateArticleComponent,
    canActivate: [AuthenticationGuard],
    resolve: { article: ArticleResolver },
  },
  { path: ':slug', component: ArticleDetailComponent, resolve: { article: ArticleResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
