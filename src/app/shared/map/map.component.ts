import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnChanges, OnDestroy {

  @Input() date : Date

  rooms : RoomStatus[]

  getAllRoomStatusSubscription : Subscription

  constructor(private roomStatusService : RoomStatusService) { }

  ngOnInit(): void {
    this.getAllRoomStatus()
    console.log(this.rooms)
  }

  ngOnChanges() {

  }

  roomIsFull(roomStatus : RoomStatus) {
    if(roomStatus.isCompanyRoom && roomStatus.nBooking == roomStatus.capacity) {
      return true;
    }
    else return false
  }

  getAllRoomStatus() {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus().subscribe(
      observer => {this.rooms = [...observer]},
      error => {console.log(error)},
      () => {console.log("Rooms list found")}
    )
    console.log(this.date)
  }

  myFormatDate (date : Date) {
    let year = date.getFullYear().toString()
    let mm = date.getMonth() + 1
    let month
    if(mm < 10) {
      month = "0" + mm.toString()
    }else {
      month = mm.toString()
    }
    let dd = date.getDate()
    let day
    if(dd < 10) {
      day = "0" + dd.toString()
    }else {
      day = dd.toString()
    }
    let fullDate = year + "-" + month + "-" + day
    return fullDate
  }

  ngOnDestroy(): void {
    this.getAllRoomStatusSubscription?.unsubscribe()
  }



}
