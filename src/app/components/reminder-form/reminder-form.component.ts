import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/reminders/reminder';
import { ReminderService } from 'src/app/services/reminder.service';
import { VisualNotificationService } from 'src/app/services/visual-notification.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit, OnDestroy {
  reminder: Reminder;
  isNewReminder = true;

  constructor(
    private visualNotificationService: VisualNotificationService,
    private reminderService: ReminderService,
    public dialogRef: MatDialogRef<ReminderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.visualNotificationService.visualNotificationsDisabled = true;
    if (this.data.reminder) {
      this.isNewReminder = false;
      this.reminder = this.data.reminder;
    }

    if (this.isNewReminder) {
      this.reminder = this.reminderService.createReminder();
    }
  }

  ngOnDestroy(): void {
    this.visualNotificationService.visualNotificationsDisabled = false;
  }

  create(): void {
    this.reminderService.addReminder(this.reminder);
    this.dialogRef.close();
  }

  delete(): void {
    this.reminderService.removeReminder(this.reminder);
    this.dialogRef.close();
  }
}
