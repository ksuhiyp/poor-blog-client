import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CreateArticleComponent } from './create-article/create-article.component';
const routes: Routes = [
  { path: 'list', component: ArticlesListComponent },
  { path: 'post', component: CreateArticleComponent, canActivate: [] },
  { path: ':slug', component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
