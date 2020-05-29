import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  article: Article;
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<CreateArticleComponent>
  ) {}
  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });

  ngOnInit(): void {}
  onSubmit() {
    this.articleService
      .postArticle(this.form.value)
      .pipe(
        tap((article) => {
          this.article = article;
          this.dialogRef.close();
        })
      )
      .subscribe();
  }



  // private domSanitizer(url) {
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }
  // public droppedImage(file: File) {
  //   this.renderArticleImage(file);
  //   this.form.addControl('photo', new FormControl(file));
  // }
  // private renderArticleImage(file: File) {
  //   const mimeType = file.type;
  //   let base64;
  //   this.droppedArticleImage = `data:${mimeType};base64,`;
  //   file.arrayBuffer().then((arrayBuffer) => {
  //     base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  //     this.droppedArticleImage = this.domSanitizer(`data:${mimeType};base64,${base64}`);
  //   });
  // }


}
