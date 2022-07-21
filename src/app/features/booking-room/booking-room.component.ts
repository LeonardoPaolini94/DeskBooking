import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";


@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.scss']
})
export class BookingRoomComponent implements OnInit {



  todayDate : Date = new Date(Date.now());

  date : Date

  constructor() { }

  ngOnInit(): void {
    this.date = this.todayDate
  }


  myFormatDateForView(date : Date) {
    let year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    let fullDate = day + "/" + month + "/" + year
    return fullDate
  }

  addEvent(type: string, event: MatDatepickerInputEvent<unknown | Date>) {
    if(event.value != null) {
      this.date = event.value as Date
    }
  }
}
