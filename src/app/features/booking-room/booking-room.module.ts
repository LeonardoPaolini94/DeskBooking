import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BookingRoomComponent} from "./booking-room.component";
import {HeaderModule} from "../../core/header/header.module";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material.module";

const routes : Routes = [{
  path: '', component: BookingRoomComponent
}]

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
})
export class BookingRoomModule { }
