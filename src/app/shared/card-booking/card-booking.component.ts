import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "../../core/service/booking.service";
import {Subscription} from "rxjs";
import {Booking} from "../../core/models/Booking";

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss']
})
export class CardBookingComponent implements OnInit,OnDestroy {

  bookingsList : Booking[];
  exist : Boolean = false;
  getAllBookingsSubscription : Subscription;

  constructor(private bookingService : BookingService) { }

  ngOnInit(): void {
    this.getAllBookings()
  }

  getAllBookings(){
    this.getAllBookingsSubscription = this.bookingService.getAllBookings().subscribe(
      observer => {
        this.bookingsList = [...observer]
        if (this.bookingsList.length > 0){
          this.exist = true
        }
      },
      error => console.log(error)
    )
  }

  ngOnDestroy(): void {
    this.getAllBookingsSubscription?.unsubscribe()
  }


}
