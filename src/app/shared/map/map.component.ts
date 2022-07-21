import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnChanges, OnDestroy {

  @Input() date : Date

  rooms : RoomStatus[]

  room : RoomStatus

  user : User

  getAllRoomStatusSubscription : Subscription

  constructor(private roomStatusService : RoomStatusService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllRoomStatus(this.date)
    let email =  sessionStorage.getItem('email')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date'].currentValue != changes['date'].previousValue) {
      this.getAllRoomStatus(this.date)
    }
  }

  roomIsFull(roomStatus : RoomStatus) {
    if(roomStatus.isCompanyRoom && roomStatus.nBooking == roomStatus.capacity) {
      return true;
    }
    else return false
  }

  getAllRoomStatus(date : Date) {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(this.myFormatDate(date)).subscribe(
      observer => {this.rooms = [...observer]},
      error => {console.log(error)},
      () => {console.log("Rooms list found")}
    )
    console.log(this.date)
  }

  openDialog(dialog : any, room : RoomStatus) {
    this.dialog.open(dialog)
    this.room = room
  }

  closeDialog(){
    this.dialog.closeAll()
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
