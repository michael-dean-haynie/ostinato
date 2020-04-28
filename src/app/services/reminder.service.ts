import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from '../reminders/reminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  reminders: Reminder[] = []

  constructor(private dialogService: MatDialog) { }

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
