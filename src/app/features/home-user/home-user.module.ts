import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUserComponent } from './home-user.component';
import {RouterModule, Routes} from "@angular/router";
import {CardBookingModule} from "../card-booking/card-booking.module";
import {HeaderModule} from "../../core/header/header.module";

const routes : Routes = [{
  path: '', component: HomeUserComponent
}
]

@NgModule({
  declarations: [
    HomeUserComponent
  ],
  exports: [
    HomeUserComponent
  ],
  imports: [
    CommonModule,
    CardBookingModule,
    HeaderModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeUserModule { }
