import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) {}
  editor: CKEditor5.BaseEditor = ClassicEditor;
  article: Article;
  form: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;
    this.initArticleForm();
  }

  private initArticleForm() {
    this.form = new FormGroup({
      title: new FormControl(this.article.title, Validators.required),
      description: new FormControl(this.article.description),
      tags: new FormControl(this.article.tagList),
      body: new FormControl(this.article.body),
    });
  }

  onSubmit() {}
}
