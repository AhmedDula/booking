import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: unknown): unknown {
    return value;
  }
}
