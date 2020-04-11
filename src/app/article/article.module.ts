import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [ArticlesListComponent, ArticleComponent],
  imports: [
    CommonModule
  ]
})
export class ArticleModule { }
