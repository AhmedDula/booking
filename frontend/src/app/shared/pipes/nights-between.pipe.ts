import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nightsbetween',
  standalone: true
})
export class NightsBetweenPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return value;
  }
}
