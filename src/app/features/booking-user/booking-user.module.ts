import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingUserComponent } from './booking-user.component';
import {HeaderModule} from "../../core/header/header.module";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {BookingRoomModule} from "../booking-room/booking-room.module";

const routes : Routes = [{
  path: '', component: BookingUserComponent
}]

@NgModule({
  declarations: [
    BookingUserComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    SharedModule,
    RouterModule.forChild(routes),
    BookingRoomModule
  ]
})
export class BookingUserModule { }
