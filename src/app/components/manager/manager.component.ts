import { Component, OnInit } from '@angular/core';
import { Reminder } from 'src/app/reminders/reminder';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  newReminder: Reminder;

  constructor(private reminderService: ReminderService) { }

  ngOnInit(): void {
    this.newReminder = this.reminderService.createReminder();
  }

  createReminder(): void {
    this.reminderService.addReminder(this.newReminder);
    this.newReminder = this.reminderService.createReminder();
  }

  deleteReminder(reminder: Reminder): void {
    this.reminderService.removeReminder(reminder);
  }

  getReminders(): Reminder[] {
    return this.reminderService.reminders;
  }

  // TODO: remove!
  logit(): void {
    console.log(this.reminderService.reminders);
  }

}
