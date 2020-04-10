import { Component, OnInit } from '@angular/core';
import { FixedPeriodRepeatingReminder } from './reminders/fixed-period-repeating-reminder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // SimpleInterval
  simpleInterval = null;
  simpleIntervalEnabled = true;
  simpleIntervalMessage = 'Simple Interval Reminder';
  simpleIntervalSeconds = 5;

  // FixedPeriodRepeatingReminder
  fixedPeriodRepeatingReminder: FixedPeriodRepeatingReminder = new FixedPeriodRepeatingReminder('Fixed Period Repeating Reminder', 3);

  ngOnInit() {
    // this.simpleIntervalReminder(this.simpleIntervalEnabled);
  }

  simpleIntervalReminder(enabled: boolean): void {
    this.simpleIntervalEnabled = enabled;
    if (this.simpleInterval != null) {
      clearInterval(this.simpleInterval);
    }
    if (enabled) {
      this.simpleInterval = setInterval(() => { console.log(this.simpleIntervalMessage); }, this.simpleIntervalSeconds * 1000);
    }
  }

  toggleFixedPeriodRepeatingReminder(): void {
    if (this.fixedPeriodRepeatingReminder.isActive()) {
      this.fixedPeriodRepeatingReminder.deactivate();
    } else {
      this.fixedPeriodRepeatingReminder.activate();
    }
  }
}
