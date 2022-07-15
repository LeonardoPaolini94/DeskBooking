import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBookingComponent } from './card-booking.component';
import {HeaderModule} from "../../core/header/header.module";



@NgModule({
  declarations: [
    CardBookingComponent
  ],
  exports: [
    CardBookingComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ]
})
export class CardBookingModule { }
