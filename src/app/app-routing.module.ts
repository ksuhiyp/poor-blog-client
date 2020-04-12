import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { ArticlesListComponent } from './article/articles-list/articles-list.component';
import { ArticleComponent } from './article/article/article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesListComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
    BrowserModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
