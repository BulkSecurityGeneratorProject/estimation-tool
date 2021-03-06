import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillter'
})
export class SktFilterPipe implements PipeTransform {

  transform(quotations: any, filter?: any): any {
    if (filter === undefined) {
     return quotations;
    }
  //   return value.filter(
  //     item => item.projectId.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  //  );

  return quotations.filter(function(quotation) {
    return quotation.id.toLowerCase().includes(quotations.toLowerCase());
  })
  }
}
