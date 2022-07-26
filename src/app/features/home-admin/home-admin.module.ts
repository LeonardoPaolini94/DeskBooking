import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";

const routes : Routes = [{
  path: '', component: HomeAdminComponent}]

@NgModule({
  declarations: [
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule
  ]
})
export class HomeAdminModule { }
