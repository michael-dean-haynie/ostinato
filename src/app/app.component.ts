import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  simpleInterval = null;
  simpleIntervalEnabled = true;
  simpleIntervalMessage = 'Simple Interval Reminder';
  simpleIntervalSeconds = 5;

  ngOnInit() {
    this.simpleIntervalReminder(this.simpleIntervalEnabled);
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
}
