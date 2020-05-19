import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tags } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) {}
  editor: CKEditor5.BaseEditor = ClassicEditor;
  article: Article;
  articleTags: string[] = [];
  form: FormGroup = new FormGroup({});
  allTags: string[];
  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;
    this.articleTags = this.article.tags?.map((tag) => tag.title) || [];
    this.getTags().subscribe((tags) => (this.allTags = tags));
    this.initArticleForm();
  }

  private initArticleForm() {
    this.form = new FormGroup({
      title: new FormControl(this.article.title, Validators.required),
      description: new FormControl(this.article.description),
      tags: new FormControl(this.article.tags),
      body: new FormControl(this.article.body),
    });
  }

  getTags(): Observable<string[]> {
    return this.articleService.getAvailableTags().pipe(map((tags) => tags.map((tag) => tag.title)));
  }

  onSubmit() {
    // Set tags controle value to articleTags model as <Tags>
    this.form.controls.tags.patchValue(
      this.articleTags.map((tag) => {
        return { title: tag };
      })
    );

    this.articleService.putArticle(this.form.value, this.article.id).subscribe();
  }
}
