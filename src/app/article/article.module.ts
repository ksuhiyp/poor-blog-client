import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './article.component';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
  declarations: [ArticlesListComponent, ArticleComponent],
  imports: [SharedModule, CommonModule, ArticleRoutingModule],
})
export class ArticleModule {}
