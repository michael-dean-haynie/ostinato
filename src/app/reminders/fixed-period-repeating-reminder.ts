import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifyDialogContentComponent } from '../components/notify-dialog-content.component';
import { RepeatingReminder } from './repeating-reminder';

export class FixedPeriodRepeatingReminder extends RepeatingReminder {
  protected timeoutId: number;
  protected waitForAkng = true;
  protected visualNotificationDialogRef: MatDialogRef<NotifyDialogContentComponent, any>;
  protected autoAkng = false;
  protected autoAkngTimeoutDuration = 3;

  constructor(message: string, protected timeoutDuration: number, protected dialogService: MatDialog) {
    super(message);
  }

  descriptionOfRepeatBehavior(): string {
    return `every ${this.timeoutDuration} second${this.timeoutDuration === 1 ? '' : 's'}`;
  }

  protected notify(): void {
    super.notify();
    if (!this.waitForAkng) {
      this.startTimeout();
    } else {
      this.visualNotificationDialogRef.afterClosed().subscribe(() => {
        this.startTimeout();
      });
    }
  }

  protected startTimeout(): void {
    this.timeoutId = window.setTimeout(() => {
      if (this.activated) {
        this.notify();
      }
    }, this.timeoutDuration * 1000);
  }

  protected clearTimeout(): void {
    window.clearTimeout(this.timeoutId);
  }

  // Notifications
  protected execConsoleNotification() {
    console.log(this.message);
  }

  protected execAudioNotification() {
    console.log(`PRETEND AUDIO: "${this.message}"`);
  }

  protected execVisualNotification() {
    this.visualNotificationDialogRef = this.dialogService.open(NotifyDialogContentComponent, { data: { message: this.message } });
    if (this.autoAkng) {
      window.setTimeout(() => {
        this.visualNotificationDialogRef.close();
      }, this.autoAkngTimeoutDuration * 1000);
    }
  }

}
