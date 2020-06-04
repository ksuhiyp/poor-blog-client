import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogConfig } from '../../models/shared.models';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent<T> implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public config: ConfirmationDialogConfig) {}

  ngOnInit(): void {}
}
