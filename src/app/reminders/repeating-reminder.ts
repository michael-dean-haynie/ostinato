export abstract class RepeatingReminder {
  protected activated = false;

  protected consoleNotification = false;
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
    this.doTheThing();

  }

  deactivate(): void {
    // TODO: maybe throw exception or warning if already deactivated
    this.activated = false;
    this.stopDoingTheThing();
  }

  isActive(): boolean {
    return this.activated;
  }

  protected abstract doTheThing(): void;
  protected abstract stopDoingTheThing(): void;

  abstract descriptionOfRepeatBehavior(): string;

  protected abstract execConsoleNotification(): void;
  protected abstract execVisualNotification(): void;
  protected abstract execAudioNotification(): void;
}

  // can probable put "from" and "to" fixed dates here
  // but those don't sound very useful :/