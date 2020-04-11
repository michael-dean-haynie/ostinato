import { MatDialog } from '@angular/material/dialog';
import { NotifyDialogContentComponent } from '../components/notify-dialog-content.component';
import { RepeatingReminder } from './repeating-reminder';

export class FixedPeriodRepeatingReminder extends RepeatingReminder {
  protected intervalId: number;

  constructor(message: string, protected periodDuration: number, protected dialogService: MatDialog) {
    super(message);
  }

  descriptionOfRepeatBehavior(): string {
    return `every ${this.periodDuration} second${this.periodDuration === 1 ? '' : 's'}`;
  }

  protected doTheThing(): void {
    this.intervalId = window.setInterval(() => {
      if (this.activated) {
        this.notify();
      }
    }, this.periodDuration * 1000);
  }

  protected stopDoingTheThing(): void {
    window.clearInterval(this.intervalId);
  }

  // Notifications
  protected execConsoleNotification() {
    console.log(this.message);
  }

  protected execAudioNotification() {
    console.log(`PRETEND AUDIO: "${this.message}"`)
  }

  protected execVisualNotification() {
    const dialogRef = this.dialogService.open(NotifyDialogContentComponent, { data: { message: this.message } });
    window.setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }

}
