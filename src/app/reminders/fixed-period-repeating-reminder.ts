import { RepeatingReminder } from './repeating-reminder';

export class FixedPeriodRepeatingReminder extends RepeatingReminder {
  protected intervalId: number;

  constructor(message: string, protected periodDuration: number) {
    super(message);
  }

  doTheThing(): void {
    this.intervalId = window.setInterval(() => {
      if (this.activated) {
        this.notify();
      }
    }, this.periodDuration * 1000);
  }

  stopDoingTheThing(): void {
    window.clearInterval(this.intervalId);
  }

  descriptionOfRepeatBehavior(): string {
    return `every ${this.periodDuration} second${this.periodDuration === 1 ? '' : 's'}`;
  }
}
