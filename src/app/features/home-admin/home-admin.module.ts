import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";
import {SharedModule} from "../../shared/shared.module";
import {BookingRoomModule} from "../booking-room/booking-room.module";

const routes : Routes = [{
  path: '', component: HomeAdminComponent}]

@NgModule({
    declarations: [
        HomeAdminComponent
    ],
    exports: [
        HomeAdminComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderModule,
        SharedModule,
        BookingRoomModule
    ]
})
export class HomeAdminModule { }
