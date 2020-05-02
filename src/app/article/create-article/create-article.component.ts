import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from '../article.service';
import {
  tap,
  distinctUntilChanged,
  debounceTime,
  startWith,
  map,
} from 'rxjs/operators';
import { TagsList } from 'src/app/shared/models/shared.models';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Observable, noop, Subject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { CommunicatorService } from 'src/app/shared/services/communicator.service';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private communicator: CommunicatorService
  ) {}

  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editorBody = '';
  editor = ClassicEditor;
  tags: TagsList[] = [];
  filteredTags: Subject<TagsList[]> = new Subject();
  selectedTags: TagsList[] = [];
  tagsCtrl = new FormControl('');
  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    tagList: [''],
    body: ['', Validators.required],
    description: [''],
  });

  ngOnInit(): void {
    this.communicator.urlSegmant.next(this.activatedRoute.snapshot.url);
    this.articleService
      .getAvailableTags()
      .pipe(tap((tags) => (this.tags = tags)))
      .subscribe();

    this.onTagsCtrlChange().subscribe();
  }
  onSubmit() {
    this.articleService.postArticle(this.form.value).subscribe();
  }

  onBodyChange(event: ChangeEvent) {
    // this.form.controls.body.setValue(event.editor.getData());
  }

  removeTag(tag) {
    const selectedTagIndex = this.selectedTags.findIndex(
      (selectedTag) => tag.id === selectedTag.id
    );
    this.selectedTags.splice(selectedTagIndex, 1);
  }
  addTag(event) {
    const term = event.value.trim();
    if (term) {
      this.selectedTags.filter((tag) => tag.title === term).length
        ? noop()
        : this.selectedTags.push({ title: term });

      this.tagsCtrl.setValue(null);
      this.tagsInput.nativeElement.value = null;
    }
  }
  addSelected(event: MatAutocompleteSelectedEvent) {
    const tag = event.option.value;
    const term = tag.title;
    this.selectedTags.filter((tag) => tag.title === term).length
      ? noop()
      : this.selectedTags.push({ title: term });

    this.tagsCtrl.setValue(null);
    this.tagsInput.nativeElement.value = null;
  }

  onTagsCtrlChange(): Observable<any> {
    return this.tagsCtrl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(50),
      map((term) => (term ? (term.trim(), term.toLowerCase()) : noop())),
      tap((term) =>
        this.filteredTags.next(
          this.filterTagsAgainstTerm(term) || this.tags.slice()
        )
      )
    );
  }

  private filterTagsAgainstTerm(term: string) {
    const regex = new RegExp(term, 'gmi');
    const filteredTags = this.tags.filter((tag) => tag.title.match(regex));
    return filteredTags;
  }
}
