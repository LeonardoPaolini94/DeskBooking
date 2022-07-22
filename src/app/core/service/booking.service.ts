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
    return this.httpClient.get<Booking[]>("http://localhost:8080/api/v1/booking");
  }

  getBookingById(id : number) : Observable<Booking>{
    return this.httpClient.get<Booking>("http://localhost:8080/api/v1/booking/" + id);
  }

    getBookingsByUser(id: string | null) : Observable<Booking>{
    return this.httpClient.get<Booking>("http://localhost:8080/api/v1/booking/user/" + id);
  }

  deleteBookingById(id : number | undefined) : Observable<Booking>{
    return this.httpClient.delete<Booking>("http://localhost:8080/api/v1/booking/" + id);
  }

}
