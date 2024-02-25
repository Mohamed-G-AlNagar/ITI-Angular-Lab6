import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creaditCardFormat',
  standalone: true,
})
export class CreaditCardFormatPipe implements PipeTransform {
  transform(value: string): string {
    const formated = value.toLocaleString().match(/.{1,4}/g);
    return formated ? formated.join('-') : '';
  }
}
