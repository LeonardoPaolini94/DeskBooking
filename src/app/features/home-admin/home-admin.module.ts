import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MaterialModule} from "../../material.module";
import {PipesModule} from "../../core/pipes/pipes.module";
import {AdminMapModule} from "../admin-map/admin-map.module";

const routes : Routes = [{
  path: '', component: HomeAdminComponent}]

@NgModule({
  declarations: [
    HomeAdminComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderModule,
        MatDatepickerModule,
        MaterialModule,
        PipesModule,
        AdminMapModule
    ]
})
export class HomeAdminModule { }
