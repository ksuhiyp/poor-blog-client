import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploaderComponent } from '../shared/components/file-uploader/file-uploader.component';
import { NgxFileDropModule } from 'ngx-file-drop';
@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailComponent,
    CreateArticleComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ArticleRoutingModule,
    CKEditorModule,
    NgxFileDropModule,
  ],
})
export class ArticleModule {}
