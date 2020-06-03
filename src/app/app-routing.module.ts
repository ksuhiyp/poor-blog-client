import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

const routes: Routes = [
  { path: '', redirectTo: 'article/list', pathMatch: 'full' },
  {
    path: 'article',
    loadChildren: () =>
      import('./article/article.module').then((m) => ArticleModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
