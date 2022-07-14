import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";

const routes: Routes = [
  { path: '', component: HomeComponent }
]


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderModule
    ]
})
export class HomeModule { }
