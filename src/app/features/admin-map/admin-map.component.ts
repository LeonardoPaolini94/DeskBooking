import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {RoomStatus} from "../../core/models/RoomStatus";
import {Room} from "../../core/models/Room";
import {User} from "../../core/models/User";
import {Subscription} from "rxjs";
import {Management} from "../../core/models/Management";
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {UserService} from "../../core/service/user-service/user.service";
import {BookingService} from "../../core/service/booking.service";
import {RoomService} from "../../core/service/room-service/room.service";
import {MatDialog} from "@angular/material/dialog";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {ManagementService} from "../../core/service/management-service/management.service";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.scss']
})
export class AdminMapComponent implements OnInit {

  @Input() date : Date

  roomStatus : RoomStatus

  roomStatusList : RoomStatus[] =[]

  room : Room

  user : User | undefined

  startDate : Date

  dateValidator : Date

  endDate : Date

  management : Management = {}

  capacity : number

  check : boolean = true

  roomManagements : Management[] = []


  getAllRoomStatusSubscription : Subscription
  getUserByEmailSubscription :Subscription
  getAllBookingsSubscription :Subscription
  getRoomByRoomNumberSubscription : Subscription
  postManagementSubscription : Subscription
  getManagementByRoomSubscription : Subscription

  constructor(private roomStatusService : RoomStatusService,
              private userService : UserService,
              private roomService : RoomService,
              private managementService : ManagementService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllRoomStatus()
    let email =  sessionStorage.getItem('email')
    if(email) {
      this.getUserByEmail(email)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date'].currentValue != changes['date'].previousValue) {
      this.getAllRoomStatus()
    }
  }

  getAllRoomStatus() {
    this.getAllRoomStatusSubscription = this.roomStatusService.getAllRoomStatus(this.myFormatDate(this.date)).subscribe(
      observer => {this.roomStatusList = [...observer]},
      error => {console.log("Rooms status list not found")},
      () => {console.log(this.roomStatusList)}
    )
  }

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.user = [...observer].find(user => user.email == email) },
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
  }

  getRoomByRoomNumber(roomNumber : number) {
    this.getRoomByRoomNumberSubscription = this.roomService.getRoomByRoomNumber(roomNumber).subscribe(
      observer => {this.room = {...observer}},
      () => {console.log("Room not found!")},
      () => {console.log("Room found!")}
    )
  }

  postManagement() {
    this.management.endDate = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth(),
      this.endDate.getDate() + 1
    )
    this.management.startDate = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth(),
      this.startDate.getDate() + 1
    )
    this.management.capacity = this.capacity
    this.management.userResponseDTO = this.user
    this.management.roomResponseDTO = this.room
    this.getManagementByRoom(this.room.id as number)
    if(this.isManagementValid(this.management)){
      this.postManagementSubscription = this.managementService.postManagement(this.management).subscribe(
        observer => {},
        error => {console.log("Post management : Error")},
        () => {console.log("Post management: Done")}
      )
    }
    this.closeDialog()
  }

  getManagementByRoom(id : number) {
    this.getManagementByRoomSubscription = this.managementService.getManagementByRoom(id).subscribe(
      observer => {this.roomManagements = [...observer]},
      error => {console.log("Management not found")},
      () => {console.log("Management found")}
    )
  }

  myFormatDate (date : Date) {
    let year = date.getFullYear().toString()
    let mm = date.getMonth() + 1
    let month
    if(mm < 10) {
      month = "0" + mm.toString()
    }else {
      month = mm.toString()
    }
    let dd = date.getDate()
    let day
    if(dd < 10) {
      day = "0" + dd.toString()
    }else {
      day = dd.toString()
    }
    let fullDate = year + "-" + month + "-" + day
    return fullDate
  }

  openDialog(dialog : any, room : RoomStatus) {
    this.dialog.open(dialog)
    this.roomStatus = room
    this.getRoomByRoomNumber(this.roomStatus.roomNumber)
  }

  closeDialog(){
    this.getAllRoomStatus()
    this.dialog.closeAll()
  }

  addStartDate(type: string, event: MatDatepickerInputEvent<unknown | Date>) {
    if(event.value != null) {
      this.startDate = event.value as Date
    }
    this.dateValidator = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth(),
      this.startDate.getDate() + 1
    )
  }

  addEndDate(type: string, event: MatDatepickerInputEvent<unknown | Date>) {
    if(event.value != null) {
      this.endDate = event.value as Date
    }
  }

  openDialogChecker() : boolean {
    this.check = !this.check
    return this.check
  }

  isManagementValid(management : Management) : boolean {

      for (let existing of this.roomManagements) {
        if (existing.startDate && existing.endDate && management.startDate && management.endDate) {
          console.log("esistono")
          if (management.startDate < management.endDate) {
            console.log("nostro controllo")
            return (!(management.startDate >= existing.startDate && management.startDate <= existing.endDate
                || management.endDate <= existing.endDate && management.endDate >= existing.startDate)
              && !(existing.startDate >= management.startDate && existing.startDate <= management.endDate
                || existing.endDate <= management.endDate && existing.endDate >= management.startDate))
          } else{
            console.log("non nel nostro controllo")
            return false
          }


        } else{
          console.log("non esistono")
          return false
        }


      }
      console.log("non entro in un cazzo di niente")
      return true
  }


  ngOnDestroy(): void {
    this.getAllRoomStatusSubscription?.unsubscribe()
    this.getUserByEmailSubscription?.unsubscribe()
    this.getAllBookingsSubscription?.unsubscribe()
    this.getRoomByRoomNumberSubscription?.unsubscribe()
    this.postManagementSubscription?.unsubscribe()
    this.getManagementByRoomSubscription?.unsubscribe()
  }

}
