import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMapComponent } from '../admin-map/admin-map.component';
import {PipesModule} from "../../core/pipes/pipes.module";
import {MaterialModule} from "../../material.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY MM DD'
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AdminMapComponent
  ],
  exports: [
    AdminMapComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: MY_DATE_FORMAT},
  ]
})
export class AdminMapModule { }
