import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingNumberPipe } from './BookingNumberPipe/booking-number.pipe';
import { MyDateViewPipe } from './MyDateViewFormatPipe/my-date-view.pipe';



@NgModule({
  declarations: [
    BookingNumberPipe,
    MyDateViewPipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        BookingNumberPipe,
        MyDateViewPipe
    ]
})
export class PipesModule { }
