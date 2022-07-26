import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipesModule} from "../core/pipes/pipes.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports: [
  ]
})
export class SharedModule { }
