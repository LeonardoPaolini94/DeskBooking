import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {RoomStatus} from "../../core/models/RoomStatus";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  rooms : RoomStatus[]

  getAllRoomStatusSubscription : Subscription

  constructor(private roomStatusService : RoomStatusService) { }

  ngOnInit(): void {
    this.getAllRoomStatus()
  }

  roomIsFull(roomStatus : RoomStatus) {
    if(roomStatus.isCompanyRoom && roomStatus.nBooking == roomStatus.capacity) {
      return true;
    }
    else return false
  }

  getAllRoomStatus() {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus().subscribe(
      observer => {this.rooms = [...observer]},
      error => {console.log("Rooms list not found")},
      () => {console.log("Rooms list found")}
    )
  }

  ngOnDestroy(): void {
    this.getAllRoomStatusSubscription?.unsubscribe()
  }



}
