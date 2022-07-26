import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBookingComponent } from './card-booking.component';
import {HeaderModule} from "../../core/header/header.module";
import {RouterModule, Routes} from "@angular/router";
import {PipesModule} from "../../core/pipes/pipes.module";

const routes : Routes = [{
  path: '', component: CardBookingComponent
}]

@NgModule({
  declarations: [
    CardBookingComponent
  ],
  exports: [
    CardBookingComponent
  ],
    imports: [
        CommonModule,
        HeaderModule,
        RouterModule,
        PipesModule,
      RouterModule.forChild(routes)
    ]
})
export class CardBookingModule { }
