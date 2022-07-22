import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class CardBookingComponent implements OnInit,OnDestroy {

  user : User

  bookingsList : Booking[]
  exist : Boolean = false;
  getAllBookingsSubscription : Subscription;
  private getBookingsByUserSubscription : Subscription;
  private getUserByEmailSubscription: Subscription;

  constructor(private bookingService : BookingService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.getAllBookings()
    let email = sessionStorage.getItem('email')
    if(email){
      this.getUserByEmail(email)
    }
    this.getBookingsByUser()
  }

  getAllBookings(){
    this.getAllBookingsSubscription = this.bookingService.getAllBookings().subscribe(
      observer => {
        this.bookingsList = [...observer]
        if (this.bookingsList.length > 0){
          this.exist = true
        }
      },
      error => {console.log(error)},
      () => {console.log("Bookings found!")}
    )
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

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getUserByEmail(email).subscribe(
      observer => {this.user = {...observer}
        sessionStorage.setItem('id',String({...observer}.id))
      },
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
  }

  ngOnDestroy(): void {
    this.getBookingsByUserSubscription?.unsubscribe()
    this.getUserByEmailSubscription?.unsubscribe()
    this.getAllBookingsSubscription?.unsubscribe()
  }


}
