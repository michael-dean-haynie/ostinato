import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog-content',
  templateUrl: './notify-dialog-content.component.html'
})
export class NotifyDialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void { }
}