import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  declarations: [ArticlesListComponent, ArticleDetailComponent],
  imports: [SharedModule, CommonModule, ArticleRoutingModule],
})
export class ArticleModule {}
