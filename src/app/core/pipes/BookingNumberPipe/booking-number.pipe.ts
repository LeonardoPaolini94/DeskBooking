import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingNumber'
})
export class BookingNumberPipe implements PipeTransform {

  transform(bookNumber : number | undefined): string {
    if(bookNumber){
      if(bookNumber < 10) {
        return "00" + bookNumber.toString()
      }
      else if(bookNumber > 9 && bookNumber < 100){
        return "0" + bookNumber.toString()
      }
      else{
        return bookNumber.toString()
      }
    }
    else
      return ""
  }


}
