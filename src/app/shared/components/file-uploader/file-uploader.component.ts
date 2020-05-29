import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  files: NgxFileDropEntry[] = [];
  @Output() droppedFile = new EventEmitter<File>();

  constructor() {}

  ngOnInit(): void {}

  public dropped(fileDrops: NgxFileDropEntry[]) {
    this.files = fileDrops;
    for (const fileDrop of fileDrops) {
      const fileEntry = fileDrop.fileEntry as FileSystemFileEntry;
      fileEntry.file((file) => {
        this.droppedFile.emit(file);
      });
    }
  }
}
