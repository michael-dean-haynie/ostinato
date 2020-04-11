export abstract class RepeatingReminder {
  protected activated = false;

  protected consoleNotification = true;
  protected visualNotification = true;
  protected audioNotification = false;

  constructor(public message: string) { }

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

  isActive(): boolean {
    return this.activated;
  }

  protected abstract startTimeout(): void;
  protected abstract clearTimeout(): void;

  abstract descriptionOfRepeatBehavior(): string;

  protected abstract execConsoleNotification(): void;
  protected abstract execVisualNotification(): void;
  protected abstract execAudioNotification(): void;
}

  // can probable put "from" and "to" fixed dates here
  // but those don't sound very useful :/