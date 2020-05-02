import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifyDialogContentComponent } from '../components/notify-dialog-content/notify-dialog-content.component';
import { NotifyDialogResult } from '../models/enums/notify-dialog-result.enum';

export class Reminder {
  protected activated = false;
  protected awaitingAcknowledgement = false;
  protected timeoutId: number;
  protected timeoutStart: number;
  protected visualNotificationDialogRef: MatDialogRef<NotifyDialogContentComponent, any>;

  message = 'Message Here!';
  timeoutDuration = 5;

  consoleNotification = true;
  visualNotification = true;
  audioNotification = true;

  waitForAkng = false;
  autoAkng = true;
  autoAkngTimeoutDuration = 3;

  secondsLeft = 0;
  protected calcSecondsLeftIntervalId: number;

  constructor(protected dialogService: MatDialog) { }

  activate(): void {
    // TODO: maybe throw exception or warning if already activated
    this.activated = true;
    this.startTimeout();

    // start calcSecondsLeft
    this.calcSecondsLeftIntervalId = window.setInterval(() => { this.calcSecondsLeft(); }, 1000);

  }

  deactivate(): void {
    // TODO: maybe throw exception or warning if already deactivated
    this.activated = false;
    this.awaitingAcknowledgement = false;
    this.clearTimeout();

    // clear calcSecondsLeft interval
    window.clearInterval(this.calcSecondsLeftIntervalId);
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

  isAwaitingAcknowledgement(): boolean {
    return this.awaitingAcknowledgement;
  }

  acknowledge(): void {
    // TODO: Maybe throw error or warning if already false?
    this.awaitingAcknowledgement = false;
    // start next cycle if configured to wait for akng
    if (this.waitForAkng) {
      this.startTimeout();
    }
  }

  minimize(): void {
    this.visualNotificationDialogRef.close(NotifyDialogResult.Minimize);
  }

  descriptionOfRepeatBehavior(): string {
    return `every ${this.timeoutDuration} second${this.timeoutDuration === 1 ? '' : 's'}`;
  }

  protected calcSecondsLeft(): void {
    this.secondsLeft = this.timeoutDuration - Math.ceil((Date.now() - this.timeoutStart) / 1000);
  }


  protected startTimeout(): void {
    this.timeoutStart = Date.now();
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

    // flag as waiting to start next cycle, or start next cycle
    if (this.waitForAkng) {
      this.awaitingAcknowledgement = true;
    }
    else {
      this.startTimeout();
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
    // minimize (or just close) any open dialogs
    this.dialogService.closeAll();

    // open dialog
    this.visualNotificationDialogRef = this.dialogService.open(NotifyDialogContentComponent, { data: { reminder: this } });

    // handle dialog close event
    this.visualNotificationDialogRef.afterClosed().subscribe((result) => {
      if (result === NotifyDialogResult.Acknowledge) {
        this.acknowledge();
      }
    });

    // start auto acknowledgement timeout (if configured)
    if (this.autoAkng) {
      window.setTimeout(() => {
        this.visualNotificationDialogRef.close(NotifyDialogResult.Acknowledge);
      }, this.autoAkngTimeoutDuration * 1000);
    }
  }
}
