import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import {PipesModule} from "../../core/pipes/pipes.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
  ]
})
export class MapModule { }
