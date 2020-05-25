import { Injectable } from '@angular/core';
import { Reminder } from '../reminders/reminder';
import { SerializedReminder } from '../reminders/serialized-reminder';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  persistReminder(reminder: Reminder) {
    const serializedReminder = this.serializeReminder(reminder);
    window.localStorage.setItem(serializedReminder.uuid, JSON.stringify(serializedReminder));
  }


  loadSerializedReminders(): SerializedReminder[] {
    const result: SerializedReminder[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const json = window.localStorage.getItem(window.localStorage.key(i));
      result.push(JSON.parse(json) as SerializedReminder);
    }
    return result;
  }

  unpersistReminder(uuid: string): void {
    window.localStorage.removeItem(uuid);
  }

  private serializeReminder(reminder: Reminder): SerializedReminder {
    const result = new SerializedReminder();
    result.uuid = reminder.uuid;
    result.name = reminder.name;
    result.timeoutDuration = reminder.timeoutDuration;
    result.consoleNotification = reminder.consoleNotification;
    result.visualNotification = reminder.visualNotification;
    result.audioNotification = reminder.audioNotification;
    result.waitForAkng = reminder.waitForAkng;
    result.autoAkng = reminder.autoAkng;
    result.autoAkngTimeoutDuration = reminder.autoAkngTimeoutDuration;
    return result;
  }
}
