import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { ChipsAutocompleatInputComponent } from './components/chips-autocompleat-input/chips-autocompleat-input.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  imports: [NgxFileDropModule, MaterialModule, CommonModule, ReactiveFormsModule],
  declarations: [FileUploaderComponent, ChipsAutocompleatInputComponent, SanitizeHtmlPipe],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FileUploaderComponent,
    ChipsAutocompleatInputComponent,
    SanitizeHtmlPipe,
  ],
})
export class SharedModule {}
