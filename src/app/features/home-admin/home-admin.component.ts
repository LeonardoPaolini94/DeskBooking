import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  todayDate : Date = new Date(Date.now());

  date : Date

  constructor( private dialog : MatDialog) { }

  ngOnInit(): void {
    this.date = this.todayDate
  }

  addEvent(type: string, event: MatDatepickerInputEvent<unknown | Date>) {
    if(event.value != null) {
      this.date = event.value as Date
    }
  }

  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}
