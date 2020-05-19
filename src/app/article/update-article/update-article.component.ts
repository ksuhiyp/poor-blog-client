import { Component, OnInit, Output, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tags } from 'src/app/shared/models/shared.models';
import { HttpEventType } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private sanitizer: DomSanitizer) {}
  editor: CKEditor5.BaseEditor = ClassicEditor;
  article: Article;
  articleTags: string[] = [];
  form: FormGroup = new FormGroup({});
  allTags: string[];
  posterProgress = 0;
  posterInProgress = false;
  droppedArticlePoster: SafeUrl;
  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;
    this.articleTags = this.article.tags?.map((tag) => tag.title) || [];
    this.getTags().subscribe((tags) => (this.allTags = tags));
    this.initArticleForm();
    // this.renderArticleImage(file);
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

  droppedImage(file: File) {
    this.renderArticleImage(file);

    const formData = this.initArticlePosterForm(file);
    this.articleService
      .patchArticlePoster(formData, this.article.id)
      .pipe(
        tap((res) => {
          this.posterInProgress = true;
          this.posterProgress = res?.progress;
        })
      )
      .subscribe();
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

  private initArticlePosterForm(file: File): FormData {
    const formData = new FormData();
    formData.append('poster', file);
    return formData;
  }

  private domSanitizer(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private renderArticleImage(file: File) {
    const mimeType = file.type;
    let base64;
    this.droppedArticlePoster = `data:${mimeType};base64,`;
    file.arrayBuffer().then((arrayBuffer) => {
      base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      this.droppedArticlePoster = this.domSanitizer(`data:${mimeType};base64,${base64}`);
    });
  }
}
