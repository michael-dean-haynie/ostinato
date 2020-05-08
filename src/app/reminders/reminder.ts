import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifyDialogContentComponent } from '../components/notify-dialog-content/notify-dialog-content.component';
import { NotifyDialogResult } from '../models/enums/notify-dialog-result.enum';

export class Reminder {
  protected activated = false;
  protected awaitingAcknowledgement = false;
  protected timeoutId: number;
  protected timeoutStart: number;
  protected lastTimeoutEnd: number;
  protected visualNotificationDialogRef: MatDialogRef<NotifyDialogContentComponent, any>;

  message = 'Message Here!';
  timeoutDuration = 5;

  consoleNotification = true;
  visualNotification = true;
  audioNotification = true;

  waitForAkng = true;
  autoAkng = false;
  autoAkngTimeoutDuration = 3;

  secondsLeft = 0;
  protected calcSecondsLeftIntervalId: number;

  secondsSince = 0;
  protected calcSecondsSinceIntervalId: number;

  constructor(protected dialogService: MatDialog) { }

  activate(): void {
    // TODO: maybe throw exception or warning if already activated
    this.activated = true;
    this.startTimeout();
  }

  deactivate(): void {
    // TODO: maybe throw exception or warning if already deactivated
    this.activated = false;
    this.awaitingAcknowledgement = false;
    this.clearTimeout();

    // clear other things
    this.timeoutId = null;
    this.timeoutStart = null;
    this.lastTimeoutEnd = null;
    this.secondsLeft = null;
    this.secondsSince = null;

    // this is otherwise only cleared on timeout so need to clear here incase premature deactivation
    window.clearTimeout(this.calcSecondsSinceIntervalId);
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

  hasTimedOutBefore(): boolean {
    return !!this.lastTimeoutEnd;
  }

  protected calcSecondsLeft(): void {
    // plus 1 so notification pops up so seconds left starts as timeoutDuration and notification activated on 0
    const secondsLeft = this.timeoutDuration - Math.ceil((Date.now() - this.timeoutStart) / 1000) + 1;
    this.secondsLeft = (secondsLeft === this.secondsLeft) ? this.secondsLeft : secondsLeft;
  }

  protected calcSecondsSince(): void {
    const secondsSince = Math.floor((Date.now() - this.lastTimeoutEnd) / 1000);
    this.secondsSince = (secondsSince === this.secondsSince) ? this.secondsSince : secondsSince;
  }




  protected startTimeout(): void {
    this.timeoutStart = Date.now();
    this.timeoutId = window.setTimeout(() => this.onTimeout(), this.timeoutDuration * 1000);

    // start calcSecondsLeft
    this.secondsLeft = this.timeoutDuration;
    this.calcSecondsLeftIntervalId = window.setInterval(() => { this.calcSecondsLeft(); }, 10);
  }

  protected clearTimeout(): void {
    window.clearTimeout(this.timeoutId);

    window.clearTimeout(this.calcSecondsLeftIntervalId);
    this.secondsLeft = 0;
  }

  protected onTimeout(): void {
    // clear timeout
    this.clearTimeout();

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

    // start calcSecondsSince
    window.clearTimeout(this.calcSecondsSinceIntervalId);
    this.lastTimeoutEnd = Date.now();
    this.secondsSince = 0;
    this.calcSecondsSinceIntervalId = window.setInterval(() => { this.calcSecondsSince(); }, 10);
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
