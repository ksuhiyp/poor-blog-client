import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, tap, mergeAll, switchMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as CKEditor from '@suhayb/ckeditor-build-custom-upload';
import { SimpleUploadConfig } from 'src/app/shared/models/simple-upload-config';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateArticleComponent implements OnInit, AfterViewInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {}
  editor;
  article: Article;
  articleTags: string[] = [];
  form: FormGroup = new FormGroup({});
  allTags: string[];
  posterProgress = 0;
  posterInProgress = false;
  droppedArticlePoster: SafeUrl;
  @ViewChild('ckeditor') ckeditor: CKEditorComponent;
  editorConfig: SimpleUploadConfig;
  articleBodyImagesLocation: string[];
  ngOnInit(): void {
    this.article = this.activatedRoute.snapshot.data.article;
    this.editor = CKEditor;
    this.articleTags = this.article.tags?.map((tag) => tag.title) || [];
    this.getTags().subscribe((tags) => (this.allTags = tags));
    this.initArticleForm();
    this.editorConfig = {
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: `http://suhayb.blog/api/article/${this.article.id}/image`,
        fieldName: 'image',
        method: 'PATCH',
      },
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'indent',
          'outdent',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
        ],
      },
      language: 'en',
      image: {
        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      licenseKey: '',
    };
    // this.renderArticleImage(file);
  }

  ngAfterViewInit() {}

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
    const formData = this.initArticlePosterForm(file);
    this.articleService
      .patchArticlePoster(formData, this.article.id)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              this.posterInProgress = true;
              this.posterProgress = progress;
              break;
            case HttpEventType.Response:
              this.article.poster = event.body.poster;
              this.cdRef.markForCheck();
          }
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

    this.articleService
      .putArticle(this.form.value, this.article.id)
      .pipe(
        switchMap((article) => this.deleteRemovedArticleImages(article)),
        tap((article) => {
          console.log(article);
          this.article = article;
          this.initArticleForm();
        })
      )
      .subscribe();
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
  // Returns article images location
  private deleteRemovedArticleImages(article): Observable<Article> {
    const editorBody = this.form.controls.body.value;
    const editorImages = Array.from(new DOMParser().parseFromString(editorBody, 'text/html').querySelectorAll('img')).map((img) =>
      img.getAttribute('src')
    );
    const articleImages = article.images;
    const imagesToDelete = articleImages.filter(
      (image) => !editorImages.find((editorImagesLocation) => editorImagesLocation === image.location)
    );
    if (imagesToDelete.length) {
      return this.articleService.deleteArticleImages(this.article.id, imagesToDelete);
    }
    return of();
  }
}
