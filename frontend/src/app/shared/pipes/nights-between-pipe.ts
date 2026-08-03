import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nightsBetween',
})
export class NightsBetweenPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
