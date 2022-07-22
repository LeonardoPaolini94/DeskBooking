import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../../models/Room";
import {RoomStatus} from "../../models/RoomStatus";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http : HttpClient) { }

  getAllRooms() : Observable<RoomStatus[]>{
    return this.http.get<RoomStatus[]>("http://localhost:8080/api/v1/room")
  }
  getRoomByRoomNumber(roomNumber : number) : Observable<Room> {
    return this.http.get<Room>("http://localhost:8080/api/v1/room/roomnumber/" + roomNumber)
  }
}
