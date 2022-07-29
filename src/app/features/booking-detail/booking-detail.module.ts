import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrenotationDetailComponent } from './booking-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";
import {MapModule} from "../map/map.module";
import {PipesModule} from "../../core/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";

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
    MapModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class BookingDetailModule { }
