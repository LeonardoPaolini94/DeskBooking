import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../core/service/booking.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Booking} from "../../core/models/Booking";

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

  constructor(private bookingService : BookingService, private route : ActivatedRoute) { }

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
    )
  }

  deleteBookingById(id : number | undefined){
    this.deleteBookingByIdSubscription = this.bookingService.deleteBookingById(id).subscribe(
      observer => {},
      error => console.log(error)
    )
  }

  ngOnDestroy(): void {
    this.getBookingIdSubscription.unsubscribe();
    this.getBookingByIdSubscription.unsubscribe();
    this.deleteBookingByIdSubscription?.unsubscribe();
  }

}
