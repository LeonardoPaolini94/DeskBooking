import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomStatus} from "../models/RoomStatus";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http : HttpClient) { }

  getAllRooms() : Observable<RoomStatus[]>{
    return this.http.get<RoomStatus[]>("http://localhost:8080/api/v1/room")
  }
}
