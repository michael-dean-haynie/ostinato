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
