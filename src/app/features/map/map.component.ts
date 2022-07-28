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
import {Router} from "@angular/router";
import {AvatarService} from "../../core/service/avatar.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnChanges, OnDestroy {

  @Input() date : Date

  bookingExist : boolean = false

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
  private avatarSubscription: Subscription;
  getBookingsByDateAndUserIdSubscription: Subscription;

  constructor(private roomStatusService : RoomStatusService,
              private userService : UserService,
              private bookingService : BookingService,
              private roomService : RoomService,
              private router : Router,
              private dialog : MatDialog,
              private avatarService : AvatarService) { }

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
      () => {console.log("Room status list found")}
    )
  }



  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.user = [...observer].find(user => user.email == email)
        this.getAvatarImage(this.user?.id)},
      () => {console.log("User not found!")},
      () => {this.avatarSubscription = this.avatarService.data$.subscribe(val => this.createImage(val))
      })
  }

  private createImage(image: Blob) {
    const preview = document.getElementById("avatarMap") as HTMLImageElement;
    if (image && image.size > 0) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
          preview.src = reader.result;
        }
      }, false);

      if(image){
        reader.readAsDataURL(image);
      }
    }
  }

  getAvatarImage(userId : number | undefined){
    if(userId){
      this.userService.getAvatar(userId).subscribe(image => this.createImage(image),
        err => this.handleImageRetrievalError(err));
    }
  }

  private handleImageRetrievalError(err: any) {
    console.error(err);
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

  //-------------------------------------------------------------------------------------------------------------------------------

  confirmBooking(){
    this.booking.bookDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() + 1
    )

    let date = this.booking.bookDate.toISOString().slice(0,10)


    this.getBookingsByDateAndUserId(date)

  }

  getBookingsByDateAndUserId(date : string){
    this.getBookingsByDateAndUserIdSubscription = this.bookingService.getBookingByBookDateAndUserId(date,sessionStorage.getItem('id')).subscribe(
      observer => {},
      () => {this.postBooking()},
      () => {this.bookingExist = true}
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
    this.postBookingSubscription = this.bookingService.postBooking(this.booking).subscribe(
      observer => {},
      error => {console.log("PostBooking: error!")},
      () => {console.log("PostBooking: Done!")}
    )
    this.closeDialog()
    this.router.navigateByUrl("/home")
  }
  //-------------------------------------------------------------------------------------------------------------------------------

  openDialog(dialog : any, room : RoomStatus) {
    this.dialog.open(dialog)
    this.roomStatus = room
    this.getAvatarImage(this.user?.id)
    this.getRoomByRoomNumber(this.roomStatus.roomNumber)
  }

  closeDialog(){
    this.dialog.closeAll()
    this.bookingExist = false
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
    this.avatarSubscription?.unsubscribe()
    this.getBookingsByDateAndUserIdSubscription?.unsubscribe()
  }
}
