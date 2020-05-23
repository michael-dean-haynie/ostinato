import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class VisualNotificationService {

  visualNotificationsDisabled = false;

  constructor(public dialogService: MatDialog) { }


}
