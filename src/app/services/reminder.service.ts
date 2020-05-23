import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from '../reminders/reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  reminders: Reminder[] = []

  constructor(private dialogService: MatDialog) {
    // Test data to work with
    let reminder: Reminder;
    reminder = this.createReminder();
    reminder.name = 'Reminder1';
    reminder.timeoutDuration = 5;
    reminder.waitForAkng = true;
    reminder.autoAkng = true;
    reminder.autoAkngTimeoutDuration = 3;
    this.addReminder(reminder);

    reminder = this.createReminder();
    reminder.name = 'Reminder2';
    reminder.timeoutDuration = 2;
    reminder.waitForAkng = false;
    reminder.autoAkng = false;
    // reminder.autoAkngTimeoutDuration = 10;
    this.addReminder(reminder);

    // this.reminders.forEach(rem => rem.activate());
  }

  createReminder(): Reminder {
    return new Reminder(this.dialogService);
  }

  cloneReminder(source: Reminder): Reminder {
    const target = this.createReminder();
    return Object.assign(target, source);
  }

  addReminder(reminder: Reminder): void {
    this.reminders.push(reminder);
  }

  removeReminder(reminder: Reminder): void {
    reminder.deactivate();
    // should eventually be garbage collected
    this.reminders = this.reminders.filter(rem => rem !== reminder);
  }

  getActiveReminders(): Reminder[] {
    return this.reminders.filter(reminder => reminder.isActive());
  }

  getInactiveReminders(): Reminder[] {
    return this.reminders.filter(reminder => !reminder.isActive());
  }

  getRemindersAwaitingAcknowledgement(): Reminder[] {
    return this.reminders.filter(reminder => reminder.isAwaitingAcknowledgement());
  }
}
