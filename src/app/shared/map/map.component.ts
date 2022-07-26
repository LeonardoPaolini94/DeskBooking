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

  firstRoomStatusList : RoomStatus[]

  roomStatusList : RoomStatus[] = []

  room : Room

  roomList : Room[]

  user : User | undefined

  booking : Booking = {}

  bookingList : Booking[]

  getAllRoomsSubscription : Subscription
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
    this.getAllRooms()
    this.getAllBookings()
    let email =  sessionStorage.getItem('email')
    if(email) {
      this.getUserByEmail(email)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date'].currentValue != changes['date'].previousValue) {
      this.getAllRooms()
    }
  }

  roomIsFull(roomStatus : RoomStatus) {
    if(roomStatus.isCompanyRoom && roomStatus.nbooking == roomStatus.capacity ) {
      return true;
    }
    else return false
  }

  getAllRoomStatus(date : Date) {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(this.myFormatDate(date)).subscribe(
      observer => {this.firstRoomStatusList = [...observer]},
      error => {console.log("Rooms status list not found")},
      () => {this.addStatusToRoom(this.roomList)}
    )
  }

  getAllRooms() {
    this.getAllRoomsSubscription = this.roomService.getAllRooms().subscribe(
      observer => {this.roomList = [...observer]},
      error => {console.log("Rooms list not found")},
      () => {this.getAllRoomStatus(this.date)}
    )
  }

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.user = [...observer].find(user => user.email == email) },
      () => {console.log("User not found!")},
      () => {console.log("User found!", sessionStorage.getItem('role'))
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
    this.booking.bookDate = this.date
    this.booking.user = this.user
    this.booking.room = this.room
    console.log(this.booking)
    this.postBookingSubscription = this.bookingService.postBooking(this.booking).subscribe(
      observer => {},
      error => {console.log("PostBooking: error!")},
      () => {console.log("PostBooking: Done!")
        this.closeDialog()}
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

   addStatusToRoom(rooms : Room[]){
      this.roomList.forEach(room => {
        let newRoomStatus : RoomStatus = {
          id : room.id as number,
          roomNumber : room.roomNumber,
          isCompanyRoom : room.isCompanyRoom,
          maxCapacity : room.maxCapacity,
          capacity : 0,
          nbooking : 0
        }
        this.roomStatusList.push(newRoomStatus)
      })
      for (let i = 0; i < this.roomStatusList.length; i++) {
        for (let j = 0; j < this.firstRoomStatusList.length; j++) {
          if(this.roomStatusList[i].roomNumber == this.firstRoomStatusList[j].roomNumber){
            this.roomStatusList[i] = {...this.firstRoomStatusList[j]};
          }
        }
      }
  }

  ngOnDestroy(): void {
    this.getAllRoomsSubscription?.unsubscribe()
    this.getAllRoomStatusSubscription?.unsubscribe()
    this.getUserByEmailSubscription?.unsubscribe()
    this.getAllBookingsSubscription?.unsubscribe()
    this.getRoomByRoomNumberSubscription?.unsubscribe()
    this.postBookingSubscription?.unsubscribe()
  }
}
