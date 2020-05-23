import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInSeconds: number): string {
    let remainder = durationInSeconds || 0;
    const hours = Math.floor(remainder / (60 * 60));

    remainder = remainder - (hours * 60 * 60);
    const minutes = Math.floor(remainder / 60);

    remainder = remainder - (minutes * 60);
    const seconds = remainder;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

}
