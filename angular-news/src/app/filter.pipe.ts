import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(value: any, filter: string): any {
    if (filter && value) {
      return value.filter((value) => {
        return value.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });
    }
    return value;
  }
}
