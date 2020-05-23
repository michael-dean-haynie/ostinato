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

  remindersTableData = [];
  remindersTableColumns = ['name', 'timeoutDuration', 'waitForAkng', 'autoAkng', 'active', 'secondsSince', 'secondsLeft', 'secondsTillAutoAkng', 'config'];

  constructor(private reminderService: ReminderService, private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.newReminder = this.reminderService.createReminder();
    this.remindersTableData = this.reminderService.reminders;
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

  activeToggled(reminder: Reminder): void {
    if (reminder.isActive()) {
      reminder.deactivate();
    } else {
      reminder.activate();
    }
  }
}
