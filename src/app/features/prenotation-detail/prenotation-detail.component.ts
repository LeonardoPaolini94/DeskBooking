import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../core/service/booking.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Booking} from "../../core/models/Booking";

@Component({
  selector: 'app-prenotation-detail',
  templateUrl: './prenotation-detail.component.html',
  styleUrls: ['./prenotation-detail.component.scss']
})
export class PrenotationDetailComponent implements OnInit,OnDestroy {

  id : number;
  getBookingByIdSubscription : Subscription;
  getBookingIdSubscription : Subscription;
  booking : Booking;
  isValid : Boolean;
  array : Array<number>;
  counteronone : number = 0;

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
    this.array =[...new Array(i)]
    this.count(this.array);
    return this.array;
  }

  count(j : Array<number>){
    j = [...this.array]
    if (this.counteronone < j.length){
      this.counteronone ++;
      return this.isValid = true;
    }
    else{
      return this.isValid = false;
    }
  }

  getBookingById(id : number){
    this.getBookingByIdSubscription = this.bookingService.getBookingById(id).subscribe(
      observer => {
        this.booking = {...observer}
      },
      error => console.log(error)
    )
  }

  ngOnDestroy(): void {
    this.getBookingIdSubscription.unsubscribe();
    this.getBookingByIdSubscription.unsubscribe();
  }

}
