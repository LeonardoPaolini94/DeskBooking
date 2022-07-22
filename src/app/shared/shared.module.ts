import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./map/map.component";
import {PipesModule} from "../core/pipes/pipes.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    MapComponent
  ]
})
export class SharedModule { }
