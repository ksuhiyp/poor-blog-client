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

  // onBodyChange(event: ChangeEvent) {
  //   this.form.controls.body.setValue(event.editor.getData());
  // }

  // removeTag(tag) {
  //   const selectedTagIndex = this.selectedTags.findIndex((selectedTag) => tag === selectedTag);
  //   this.selectedTags.splice(selectedTagIndex, 1);
  // }
  // addTag(event) {
  //   const term = event.value.trim();
  //   if (term) {
  //     this.selectedTags.filter((tag) => tag === term).length ? noop() : this.selectedTags.push(term);

  //     this.tagsInput.nativeElement.value = null;
  //     this.form.get('tagList').patchValue(this.selectedTags);
  //   }
  // }
  // addSelected(event: MatAutocompleteSelectedEvent) {
  //   const tag = event.option.value;
  //   const term = tag.title;
  //   this.selectedTags.filter((tag) => tag === term).length ? noop() : this.selectedTags.push(term);

  //   // this.tagsCtrl.setValue(null);
  //   this.tagsInput.nativeElement.value = null;
  // }

  // onTagListChange(): Observable<any> {
  //   return this.form.get('tagList').valueChanges.pipe(
  //     startWith(''),
  //     distinctUntilChanged(),
  //     debounceTime(50),
  //     map((term) => (term ? (term.trim(), term.toLowerCase()) : noop())),
  //     tap((term) => this.filteredTags.next(this.filterTagsAgainstTerm(term) || this.tags.slice()))
  //   );
  // }

  // private filterTagsAgainstTerm(term: string) {
  //   const regex = new RegExp(term, 'gmi');
  //   const filteredTags = this.tags.filter((tag) => tag.title.match(regex));
  //   return filteredTags;
  // }

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

  // private toFormData(form: FormGroup) {
  //   const formData = new FormData();
  //   // tslint:disable-next-line: forin
  //   for (const formField in form.value) {
  //     if (formField === 'photo') {
  //       formData.append(formField, form.get(formField).value, form.value[formField].name);
  //     } else if (formField === 'tagList') {
  //       form.value[formField].forEach((tag) => {
  //         formData.append(formField, form.value[formField]);
  //       });
  //     } else {
  //       formData.append(formField, form.value[formField]);
  //     }
  //   }
  //   return formData;
  // }
}
