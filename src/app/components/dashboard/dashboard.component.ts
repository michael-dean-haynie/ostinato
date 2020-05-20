import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from 'src/app/reminders/reminder';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  newReminder: Reminder;

  constructor(private reminderService: ReminderService, private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.newReminder = this.reminderService.createReminder();
    this.createReminder();
    this.createReminder();
  }

  createReminder(): void {
    this.reminderService.addReminder(this.newReminder);
    this.newReminder = this.reminderService.cloneReminder(this.newReminder);
  }

  deleteReminder(reminder: Reminder): void {
    this.reminderService.removeReminder(reminder);
  }

  getActiveReminders(): Reminder[] {
    return this.reminderService.getActiveReminders();
  }

  getInactiveReminders(): Reminder[] {
    return this.reminderService.getInactiveReminders();
  }

  getRemindersAwaitingAcknowledgement(): Reminder[] {
    return this.reminderService.getRemindersAwaitingAcknowledgement();
  }
}
