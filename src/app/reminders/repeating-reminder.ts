export abstract class RepeatingReminder {
  protected activated = false;

  constructor(public message: string) { }

  protected notify(): void {
    console.log(this.message);
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

  abstract doTheThing(): void;
  abstract stopDoingTheThing(): void;
}

  // can probable put "from" and "to" fixed dates here
  // but those don't sound very useful :/