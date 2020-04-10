import { Component, OnInit } from '@angular/core';
import { FixedPeriodRepeatingReminder } from './reminders/fixed-period-repeating-reminder';
import { RepeatingReminder } from './reminders/repeating-reminder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Reminder List
  reminders: RepeatingReminder[] = [];

  // Create Reminder
  message = 'Hey do that thing!';
  duration = 5;

  ngOnInit() {

  }



  createNewReminder(): void {
    this.reminders.push(new FixedPeriodRepeatingReminder(this.message, this.duration));
  }

  toggleActivation(reminder: RepeatingReminder): void {
    if (reminder.isActive()) {
      reminder.deactivate();
    } else {
      reminder.activate();
    }
  }
}
