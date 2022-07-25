import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../core/models/User";
import {UserService} from "../../core/service/user-service/user.service";
import {BookingService} from "../../core/service/booking.service";
import {Booking} from "../../core/models/Booking";
import {Room} from "../../core/models/Room";
import {RoomService} from "../../core/service/room-service/room.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnChanges, OnDestroy {

  @Input() date : Date

  data : Date = new Date(Date.now())

  roomStatus : RoomStatus

  roomStatusList : RoomStatus[]

  room : Room

  user : User | undefined

  booking : Booking = {}

  bookingList : Booking[]

  getAllRoomStatusSubscription : Subscription
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
    this.getAllRoomStatus()
    this.getAllBookings()
    let email =  sessionStorage.getItem('email')
    if(email) {
      this.getUserByEmail(email)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date'].currentValue != changes['date'].previousValue) {
      this.getAllRoomStatus()
    }
  }

  roomIsFull(roomStatus : RoomStatus) {
    if(roomStatus.isCompanyRoom && roomStatus.numBooking == roomStatus.capacity && roomStatus.capacity != null) {
      return true;
    }
    else return false
  }

  getAllRoomStatus() {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(this.myFormatDate(this.date)).subscribe(
      observer => {this.roomStatusList = [...observer]},
      error => {console.log("Rooms status list not found")},
      () => {"Rooms status list found"}
    )
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

  getRoomByRoomNumber(roomNumber : number) {
    this.getRoomByRoomNumberSubscription = this.roomService.getRoomByRoomNumber(roomNumber).subscribe(
      observer => {this.room = {...observer}},
      () => {console.log("Room not found!")},
      () => {console.log("Room found!")}
      )
  }

  postBooking() {
    this.booking.bookDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() + 1
    )
    this.booking.userResponseDTO = this.user
    this.booking.roomResponseDTO = this.room
    console.log(this.booking)
    this.postBookingSubscription = this.bookingService.postBooking(this.booking).subscribe(
      observer => {},
      error => {console.log("PostBooking: error!")},
      () => {console.log("PostBooking: Done!")}
    )
    this.closeDialog()
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
