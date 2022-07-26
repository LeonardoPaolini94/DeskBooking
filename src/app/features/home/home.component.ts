import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../../core/models/User";
import {Booking} from "../../core/models/Booking";
import {Subscription} from "rxjs";
import {BookingService} from "../../core/service/booking.service";
import {UserService} from "../../core/service/user-service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User

  bookingsList: Booking[]
  exist: Boolean = false;
  private getBookingsByUserSubscription: Subscription;
  private getUserByEmailSubscription: Subscription;


  constructor(private bookingService: BookingService,
              private userService: UserService) {
  }


  ngOnInit(): void {
    let email = sessionStorage.getItem('email')
    if(email){
      this.getUserByEmail(email)
    }
    this.getBookingsByUser()
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
  }

}
