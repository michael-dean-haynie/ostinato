import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Reminder } from 'src/app/reminders/reminder';
import { ReminderService } from 'src/app/services/reminder.service';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  newReminder: Reminder;

  remindersTableData: Observable<Reminder[]>;
  remindersTableColumns = ['name', 'active', 'timeoutDuration', 'waitForAkng', 'autoAkng', 'secondsSince', 'secondsLeft'];

  constructor(private reminderService: ReminderService, private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.newReminder = this.reminderService.createReminder();
    this.remindersTableData = this.reminderService.remindersSubject.asObservable();
  }

  createReminder(): void {
    this.reminderService.addReminder(this.newReminder);
    this.newReminder = this.reminderService.cloneReminder(this.newReminder);
  }

  deleteReminder(reminder: Reminder): void {
    this.reminderService.removeReminder(reminder);
  }

  activeToggled(reminder: Reminder): void {
    if (reminder.isActive()) {
      reminder.deactivate();
    } else {
      reminder.activate();
    }
  }

  configureReminder(reminder: Reminder): void {
    this.dialogService.open(ReminderFormComponent, { data: { reminder } });
  }

  createNewReminder(): void {
    this.dialogService.open(ReminderFormComponent, { data: {} });
  }

  getReminders(): Reminder[] {
    return this.reminderService.reminders;
  }

  getRemindersAwaitingAcknowledgement(): Reminder[] {
    return this.reminderService.getRemindersAwaitingAcknowledgement();
  }
}
