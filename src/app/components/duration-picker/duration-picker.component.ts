import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-duration-picker',
  templateUrl: './duration-picker.component.html',
  styleUrls: ['./duration-picker.component.scss']
})
export class DurationPickerComponent implements OnChanges {
  hours = 0;
  minutes = 0;
  seconds = 0;

  @Input() durationInSeconds;
  @Output() durationInSecondsChange = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(): void {
    let remainder = this.durationInSeconds || 0;
    this.hours = Math.floor(remainder / (60 * 60));

    remainder = remainder - (this.hours * 60 * 60);
    this.minutes = Math.floor(remainder / 60);

    remainder = remainder - (this.minutes * 60);
    this.seconds = remainder;

  }

  private updateAndEmitDurationInSeconds(): void {
    let newDuration = 0;
    newDuration += this.hours * (60 * 60);
    newDuration += this.minutes * 60;
    newDuration += this.seconds;

    this.durationInSeconds = newDuration;
    this.durationInSecondsChange.emit(this.durationInSeconds);

  }

}
