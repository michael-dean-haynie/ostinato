import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyDialogResult } from 'src/app/models/enums/notify-dialog-result.enum';

@Component({
  selector: 'app-notify-dialog-content',
  templateUrl: './notify-dialog-content.component.html'
})
export class NotifyDialogContentComponent {
  notifyDialogResult = NotifyDialogResult;

  constructor(public dialogRef: MatDialogRef<NotifyDialogContentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void { }
}