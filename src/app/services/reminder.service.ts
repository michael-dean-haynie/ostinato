import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reminder } from '../reminders/reminder';
import { VisualNotificationService } from './visual-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  reminders: Reminder[] = [];
  remindersSubject = new BehaviorSubject<Reminder[]>(this.reminders);

  constructor(private visualNotificationService: VisualNotificationService) {
    // // Test data to work with
    // let reminder: Reminder;
    // reminder = this.createReminder();
    // reminder.name = 'Take a walk';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);

    // reminder = this.createReminder();
    // reminder.name = 'Check posture';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);

    // reminder = this.createReminder();
    // reminder.name = 'Don\'t forget to eat food!';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);

    // reminder = this.createReminder();
    // reminder.name = 'Yoga';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);

    // reminder = this.createReminder();
    // reminder.name = '5';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);

    // reminder = this.createReminder();
    // reminder.name = 'What on earth';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);

    // reminder = this.createReminder();
    // reminder.name = 'Is all this about?';
    // reminder.timeoutDuration = 2;
    // reminder.waitForAkng = true;
    // reminder.autoAkng = false;
    // // reminder.autoAkngTimeoutDuration = 3;
    // this.addReminder(reminder);


    // this.reminders.forEach(rem => rem.activate());
  }

  createReminder(): Reminder {
    return new Reminder(this.visualNotificationService);
  }

  cloneReminder(source: Reminder): Reminder {
    const target = this.createReminder();
    return Object.assign(target, source);
  }

  addReminder(reminder: Reminder): void {
    this.reminders.push(reminder);
    this.updateRemindersSubject();
  }

  removeReminder(reminder: Reminder): void {
    reminder.deactivate();
    // should eventually be garbage collected
    this.reminders = this.reminders.filter(rem => rem !== reminder);
    this.updateRemindersSubject();
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

  private updateRemindersSubject(): void {
    this.remindersSubject.next(this.reminders);
  }
}
