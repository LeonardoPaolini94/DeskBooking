import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BookingRoomComponent} from "./booking-room.component";
import {HeaderModule} from "../../core/header/header.module";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";

const routes : Routes = [{
  path: '', component: BookingRoomComponent
}]

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY MM DD'
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
    declarations: [BookingRoomComponent],
    exports: [
        BookingRoomComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        SharedModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ]
  declarations: [BookingRoomComponent],
  imports: [
    CommonModule,
    HeaderModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMAT},
  ]
})
export class BookingRoomModule { }
