import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifyDialogContentComponent } from '../components/notify-dialog-content.component';

export class Reminder {
  protected activated = false;
  protected timeoutId: number;
  protected visualNotificationDialogRef: MatDialogRef<NotifyDialogContentComponent, any>;

  message = 'Message Here!';
  timeoutDuration = 5;

  consoleNotification = true;
  visualNotification = true;
  audioNotification = true;

  waitForAkng = false;
  autoAkng = true;
  autoAkngTimeoutDuration = 3;

  constructor(protected dialogService: MatDialog) { }

  activate(): void {
    // TODO: maybe throw exception or warning if already activated
    this.activated = true;
    this.startTimeout();

  }

  deactivate(): void {
    // TODO: maybe throw exception or warning if already deactivated
    this.activated = false;
    this.clearTimeout();
  }

  toggleActivation(): void {
    if (this.isActive()) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  isActive(): boolean {
    return this.activated;
  }

  descriptionOfRepeatBehavior(): string {
    return `every ${this.timeoutDuration} second${this.timeoutDuration === 1 ? '' : 's'}`;
  }

  protected startTimeout(): void {
    this.timeoutId = window.setTimeout(() => this.onTimeout(), this.timeoutDuration * 1000);
  }

  protected clearTimeout(): void {
    window.clearTimeout(this.timeoutId);
  }

  protected onTimeout(): void {
    // notify
    if (this.activated) {
      this.notify();
    }

    // start next cycle
    if (!this.waitForAkng) {
      this.startTimeout();
    } else {
      this.visualNotificationDialogRef.afterClosed().subscribe(() => {
        this.startTimeout();
      });
    }
  }

  protected notify(): void {
    if (this.consoleNotification) {
      this.execConsoleNotification();
    }
    if (this.visualNotification) {
      this.execVisualNotification();
    }
    if (this.audioNotification) {
      this.execAudioNotification();
    }
  }

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
