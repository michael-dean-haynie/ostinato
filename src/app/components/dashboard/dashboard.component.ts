import { Component, OnInit } from '@angular/core';
import { Reminder } from 'src/app/reminders/reminder';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

  getActiveReminders(): Reminder[] {
    return this.reminderService.reminders.filter(reminder => reminder.isActive());
  }

  getInactiveReminders(): Reminder[] {
    return this.reminderService.reminders.filter(reminder => !reminder.isActive());
  }

}
