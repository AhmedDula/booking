
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nightsBetween',
  standalone: true
})
export class NightsBetweenPipe implements PipeTransform {

  transform(checkIn: string | Date, checkOut: string | Date): number {

    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();

    return Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );
  }
}
