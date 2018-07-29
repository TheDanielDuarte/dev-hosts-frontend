import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldToWord'
})
export class FieldToWordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const replacedUppercaseWithSpaceValue = value.replace(/([A-Z])/g, ' $1').trim();
    return replacedUppercaseWithSpaceValue.toLowerCase();
  }

}
