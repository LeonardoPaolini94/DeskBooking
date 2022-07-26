import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMapComponent } from '../admin-map/admin-map.component';
import {PipesModule} from "../../core/pipes/pipes.module";



@NgModule({
  declarations: [
    AdminMapComponent
  ],
  exports: [
    AdminMapComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class AdminMapModule { }
