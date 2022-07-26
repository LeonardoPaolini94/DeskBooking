import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BookingService} from "../../core/service/booking.service";
import {Subscription} from "rxjs";
import {Booking} from "../../core/models/Booking";
import {UserService} from "../../core/service/user-service/user.service";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss']
})
export class CardBookingComponent implements OnInit, OnDestroy {

  @Input() bookingsList : Booking[]
  @Input() exist : Boolean = false;

  private getBookingsByUserSubscription: Subscription;


  constructor(private bookingService: BookingService) { }


  ngOnInit(): void {
    this.getBookingsByUser()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bookingsList'].firstChange){
      this.getBookingsByUser()
    }
  }

  getBookingsByUser(){
    this.getBookingsByUserSubscription = this.bookingService.getBookingsByUser(sessionStorage.getItem('id')).subscribe(
      observer => {
        // @ts-ignore
        this.bookingsList = [...observer]
        if (this.bookingsList.length > 0){
          this.exist = true
        }
      },
      error => {console.log(error)},
      () => {console.log("Bookings found!")}
    )
  }

  ngOnDestroy(): void {
    this.getBookingsByUserSubscription?.unsubscribe()
  }



}
