import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDateView'
})
export class MyDateViewPipe implements PipeTransform {

  transform(date : Date): string {

      let year = date.getFullYear().toString()
      let month = (date.getMonth() + 1).toString()
      let day = date.getDate().toString()
      let fullDate = day + "/" + month + "/" + year
      return fullDate

  }

}
