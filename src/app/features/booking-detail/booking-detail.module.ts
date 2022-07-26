import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrenotationDetailComponent } from './booking-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";
import {MapModule} from "../map/map.module";

const routes: Routes = [
  { path: '', component: PrenotationDetailComponent }
]

@NgModule({
  declarations: [
    PrenotationDetailComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderModule,
        MapModule
    ]
})
export class BookingDetailModule { }
