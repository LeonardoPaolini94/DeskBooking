import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomStatus} from "../../models/RoomStatus";

@Injectable({
  providedIn: 'root'
})
export class RoomStatusService {

  constructor(private http : HttpClient) { }

  getAllRoomStatus(date : String) : Observable<RoomStatus[]> {
    return this.http.get<RoomStatus[]>("http://localhost:3000/roomstatus")
  }

}
