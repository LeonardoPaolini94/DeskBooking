import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../models/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient : HttpClient) { }

  getAllBookings() : Observable<Booking[]>{
    return this.httpClient.get<Booking[]>("http://localhost:3000/Bookings");
  }

  getBookingById(id : number) : Observable<Booking>{
    return this.httpClient.get<Booking>("http://localhost:3000/Bookings/" + id);
  }

  deleteBookingById(id : number | undefined) : Observable<Booking>{
    return this.httpClient.delete<Booking>("http://localhost:3000/Bookings/" + id);
  }
}
