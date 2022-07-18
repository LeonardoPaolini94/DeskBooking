import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderModule} from "../../core/header/header.module";
import {ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  { path: '', component: SettingsComponent }
]

@NgModule({
  declarations: [
    SettingsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HeaderModule,
        ReactiveFormsModule,
    ]
})
export class ProfileModule { }
