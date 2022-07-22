import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../../models/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http : HttpClient) { }

  getRoomByRoomNumber(roomNumber : number) : Observable<Room> {
    return this.http.get<Room>("http://localhost:3000/rooms/" + roomNumber)
  }
}
