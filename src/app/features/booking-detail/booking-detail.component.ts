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
  roomStatus : RoomStatus ;
  roomStatusSubscription: Subscription;

  constructor(private bookingService : BookingService,
              private route : ActivatedRoute,
              private authService : AuthService,
              private router : Router,
              private dialog : MatDialog,
              private userService : UserService,
              private roomStatusService : RoomStatusService) { }

  ngOnInit(): void {
    this.getBookingIdSubscription = this.route.paramMap.subscribe(
      params => {
        this.id = Number(params.get('id'))
      },
      error => console.log(error)
    )

    this.getBookingById(this.id);
  }

  counter(i: number | undefined) {
    return new Array(i);
  }

  getBookingById(id : number){
    this.getBookingByIdSubscription = this.bookingService.getBookingById(id).subscribe(
      observer => {
        this.booking = {...observer}
      },
      error => console.log(error)
    //   () => {
    //
    //     if (this.booking.roomResponseDTO?.id && this.booking.bookDate)
    //       this.getRoomStatus(this.id,this.booking.bookDate)}
    )
  }

  // getRoomStatus(roomId : number , date : Date  ){
  //
  //   console.log("sono in getRoomStatus")
  //   this.roomStatusSubscription = this.roomStatusService.getRoomStatusByIdAndDate(roomId , this.myFormatDate(date)).subscribe(
  //     observer => { this.roomStatus = { ...observer};console.log(this.roomStatus)},
  //     error => console.log(error),
  //     () => console.log(this.roomStatus)
  //   )
  //
  // }

  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }
  showMap(){
    if (this.mapShown == false){
      this.mapShown = true;
    }
    else {
      this.mapShown = false;
    }
  }

  deleteBookingById(id: number | undefined){
    this.deleteBookingByIdSubscription = this.bookingService.deleteBookingById(id).subscribe(
      observer => {},
      error => console.log(error),
    )
    this.closeDialog()
  }

  // myFormatDate (date : Date) {
  //   let year = date.getFullYear().toString()
  //   let mm = date.getMonth() + 1
  //   let month
  //   if(mm < 10) {
  //     month = "0" + mm.toString()
  //   }else {
  //     month = mm.toString()
  //   }
  //   let dd = date.getDate()
  //   let day
  //   if(dd < 10) {
  //     day = "0" + dd.toString()
  //   }else {
  //     day = dd.toString()
  //   }
  //   let fullDate = year + "-" + month + "-" + day
  //   return fullDate
  // }

  ngOnDestroy(): void {
    this.getBookingIdSubscription?.unsubscribe();
    this.getBookingByIdSubscription?.unsubscribe();
    this.deleteBookingByIdSubscription?.unsubscribe();
    this.roomStatusSubscription?.unsubscribe()
  }

}
