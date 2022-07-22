import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../core/models/User";
import {UserService} from "../../core/service/user-service/user.service";
import {BookingService} from "../../core/service/booking.service";
import {Booking} from "../../core/models/Booking";
import {RoomService} from "../../core/service/room.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnChanges, OnDestroy {

  @Input() date : Date

  rooms : RoomStatus[]

  data : Date = new Date(Date.now())

  roomStatus : RoomStatus

  roomList : RoomStatus[]

  room : RoomStatus

  user : User | undefined

  booking : Booking = {}

  bookingList : Booking[]

  getAllRoomStatusSubscription : Subscription
  getAllRoomsSubscription : Subscription
  getUserByEmailSubscription :Subscription
  getAllBookingsSubscription :Subscription
  getRoomByRoomNumberSubscription : Subscription
  postBookingSubscription : Subscription

  constructor(private roomStatusService : RoomStatusService,
              private userService : UserService,
              private bookingService : BookingService,
              private roomService : RoomService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllRooms()
    this.getAllRoomStatus(this.date)
    this.getAllBookings()
    let email =  sessionStorage.getItem('email')
    if(email) {
      this.getUserByEmail(email)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date'].currentValue != changes['date'].previousValue) {
      this.getAllRoomStatus(this.date)
    }
  }

  roomIsFull(roomStatus : RoomStatus) {
    if(roomStatus.isCompanyRoom && roomStatus.nBooking == roomStatus.capacity && roomStatus.capacity != null) {
      return true;
    }
    else return false
  }
  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.user = [...observer].find(user => user.email == email) },
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
  }

  getAllBookings(){
    this.getAllBookingsSubscription = this.bookingService.getAllBookings().subscribe(
      observer => {
        this.bookingList = [...observer]},
      error => console.log(error)
    )
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
  }

  getRoomByRoomNumber(roomNumber : number) {
    this.getRoomByRoomNumberSubscription = this.roomService.getRoomByRoomNumber(roomNumber).subscribe(
      observer => {this.room = {...observer}},
      () => {console.log("Room not found!")},
      () => {console.log("Room found!")}
      )
  }

  postBooking() {
    this.booking.bookDate = this.date
    this.booking.user = this.user
    this.booking.room = this.room
    this.postBookingSubscription = this.bookingService.postBooking(this.booking).subscribe(
      observer => {console.log(this.booking)},
      () => {console.log("Room not found!")},
      () => {console.log("Room found!")}
    )
    this.closeDialog()
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
    this.roomStatus = room
    this.getRoomByRoomNumber(this.roomStatus.roomNumber)
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
    this.getUserByEmailSubscription?.unsubscribe()
    this.getAllBookingsSubscription?.unsubscribe()
    this.getRoomByRoomNumberSubscription?.unsubscribe()
    this.postBookingSubscription?.unsubscribe()
  }
}
