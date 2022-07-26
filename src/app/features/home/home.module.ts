import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeAdminModule} from "../home-admin/home-admin.module";
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";
import {HomeUserModule} from "../home-user/home-user.module";

const routes : Routes = [{
  path: '', component: HomeComponent
}]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeAdminModule,
    HeaderModule,
    HomeUserModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
