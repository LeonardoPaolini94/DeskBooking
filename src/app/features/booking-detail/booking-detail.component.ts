import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../core/service/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Booking} from "../../core/models/Booking";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../core/service/auth.service";
import {UserService} from "../../core/service/user-service/user.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Room} from "../../core/models/Room";

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class PrenotationDetailComponent implements OnInit,OnDestroy {

  id : number;
  getBookingByIdSubscription : Subscription;
  getBookingIdSubscription : Subscription;
  deleteBookingByIdSubscription : Subscription;
  booking : Booking;
  mapShown : Boolean = false;
  roomStatusSubscription: Subscription;

  roomStatusList : RoomStatus[]
  private getAllRoomStatusSubscription: Subscription;
  formRooms : FormGroup
  private modifyBookingSubscription: Subscription;

  constructor(private bookingService : BookingService,
              private route : ActivatedRoute,
              private authService : AuthService,
              private router : Router,
              private dialog : MatDialog,
              private roomStatusService : RoomStatusService) { }

  ngOnInit(): void {
    this.formRooms = new FormGroup({
      roomsSelect : new FormControl('')
    })

    this.getBookingIdSubscription = this.route.paramMap.subscribe(
      params => {
        this.id = Number(params.get('id'))
      },
      error => console.log(error)
    )

    this.getBookingById(this.id);
  }

  // getAllRoomStatus() {
  //   this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(this.myFormatDate(this.date)).subscribe(
  //     observer => {this.roomStatusList = [...observer]},
  //     error => {console.log("Rooms status list not found")},
  //     () => {console.log("Room status list found")}
  //   )
  // }

  counter(i: number | undefined) {
    return new Array(i);
  }

  getBookingById(id : number){
    this.getBookingByIdSubscription = this.bookingService.getBookingById(id).subscribe(
      observer => {
        this.booking = {...observer}
      },
      error => console.log(error)
    )
  }


  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }
  showMap(){
    this.mapShown = !this.mapShown
  }

  deleteBookingById(id: number | undefined){
    this.deleteBookingByIdSubscription = this.bookingService.deleteBookingById(id).subscribe(
      observer => {},
      error => console.log(error),
    )
    this.closeDialog()
  }


  openModify(dialogModify: any) {
    if (this.booking.bookDate){
      this.getAllRoomStatus(this.booking.bookDate)
    }

    this.dialog.open(dialogModify)
  }

  getAllRoomStatus(date : Date) {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(date.toString()).subscribe(
      observer => {this.roomStatusList = [...observer]},
      error => {console.log("Rooms status list not found")},
      () => {console.log("Room status list found")}
    )
  }

  modifyBookingRoom() {
    let room = this.formRooms.value as Room
    this.booking.roomResponseDTO = room
    this.modifyBookingSubscription = this.bookingService.patchBooking(this.id ,room).subscribe(
      observer => {this.booking = {...observer}},
      error => {console.log("Rooms status list not found")}
    )
  }

  ngOnDestroy(): void {
    this.getBookingIdSubscription?.unsubscribe();
    this.getBookingByIdSubscription?.unsubscribe();
    this.deleteBookingByIdSubscription?.unsubscribe();
    this.roomStatusSubscription?.unsubscribe()
    this.modifyBookingSubscription.unsubscribe()
  }

}
