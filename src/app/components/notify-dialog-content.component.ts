import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog-content',
  template: `
    <p>{{data.message}}<p>
  `,
})
export class NotifyDialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}