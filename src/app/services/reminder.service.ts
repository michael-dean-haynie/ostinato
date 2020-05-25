import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Reminder } from '../reminders/reminder';
import { PersistenceService } from './persistence.service';
import { VisualNotificationService } from './visual-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  reminders: Reminder[] = [];
  remindersSubject = new BehaviorSubject<Reminder[]>(this.reminders);

  constructor(
    private visualNotificationService: VisualNotificationService,
    private persistenceService: PersistenceService
  ) {
    this.initializePersistedReminders();


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

    // console.log(this.reminders);


    // this.reminders.forEach(rem => rem.activate());
  }

  createReminder(): Reminder {
    return new Reminder(this, this.visualNotificationService, this.persistenceService, uuidv4());
  }

  cloneReminder(source: Reminder): Reminder {
    const target = this.createReminder();
    return Object.assign(target, source);
  }

  addReminder(reminder: Reminder): void {
    this.reminders.push(reminder);
    // persist
    reminder.persist();

    this.updateRemindersSubject();
  }

  removeReminder(reminder: Reminder): void {
    reminder.deactivate();
    // should eventually be garbage collected
    this.reminders = this.reminders.filter(rem => rem !== reminder);
    // remove from persistence
    reminder.unpersist();

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

  protected initializePersistedReminders() {
    this.persistenceService.loadSerializedReminders().forEach(serRem => {
      const reminder = new Reminder(this, this.visualNotificationService, this.persistenceService, serRem.uuid);
      reminder.name = serRem.name;
      reminder.timeoutDuration = serRem.timeoutDuration;
      reminder.consoleNotification = serRem.consoleNotification;
      reminder.visualNotification = serRem.visualNotification;
      reminder.audioNotification = serRem.audioNotification;
      reminder.waitForAkng = serRem.waitForAkng;
      reminder.autoAkng = serRem.autoAkng;
      reminder.autoAkngTimeoutDuration = serRem.autoAkngTimeoutDuration;

      this.addReminder(reminder);
    });
  }
}
