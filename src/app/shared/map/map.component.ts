import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../core/models/User";
import {RoomService} from "../../core/service/room.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnChanges, OnDestroy {

  @Input() date : Date

  rooms : RoomStatus[]

  roomList : RoomStatus[]

  room : RoomStatus

  user : User

  getAllRoomStatusSubscription : Subscription
  getAllRoomsSubscription : Subscription

  constructor(private roomStatusService : RoomStatusService,
              private dialog : MatDialog,
              private roomService : RoomService) { }

  ngOnInit(): void {
    this.getAllRooms()
    this.getAllRoomStatus(this.date)
    let email =  sessionStorage.getItem('email')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date'].currentValue != changes['date'].previousValue) {
      this.getAllRoomStatus(this.date)
    }
  }

  roomIsFull(roomStatus : RoomStatus) {
    return roomStatus.isCompanyRoom && roomStatus.nBooking == roomStatus.capacity && roomStatus.capacity != null;
  }

  getAllRoomStatus(date : Date) {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(this.myFormatDate(date)).subscribe(
      observer => {this.roomList = [...observer];
        for (let i = 0; i < this.roomList.length; i++) {
          for (let j = 0; j < this.rooms.length; j++) {
            if(this.roomList[i].roomNumber == this.rooms[j].roomNumber){
              this.rooms[j] = this.roomList[i]
            }
          }
        }},
      error => {console.log(error)},
      () => {console.log(this.rooms)}
    )
    console.log(this.date)
  }

  getAllRooms(){
    this.getAllRoomsSubscription = this.roomService.getAllRooms().subscribe(
      observer => {this.rooms = [...observer]},
      error => {console.log(error)},
      () => {console.log(this.rooms)}
    )
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
