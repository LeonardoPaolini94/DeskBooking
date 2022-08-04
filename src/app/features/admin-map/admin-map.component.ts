import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {RoomStatus} from "../../core/models/RoomStatus";
import {Room} from "../../core/models/Room";
import {User} from "../../core/models/User";
import {Subscription} from "rxjs";
import {Management} from "../../core/models/Management";
import {RoomStatusService} from "../../core/service/room-status-service/room-status.service";
import {UserService} from "../../core/service/user-service/user.service";
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

  id : number

  managementFound : Management = {};

  getAllRoomStatusSubscription : Subscription
  getUserByEmailSubscription :Subscription
  getAllBookingsSubscription :Subscription
  getRoomByRoomNumberSubscription : Subscription
  postManagementSubscription : Subscription
  getManagementByRoomSubscription : Subscription
  patchManagementSubscription : Subscription
  getManagementByDateAndRoomSubscription : Subscription
  deleteManagementByIdSubscription : Subscription;

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
      () => {this.getManagementByRoom(this.room)}
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
      this.postManagementSubscription = this.managementService.postManagement(this.management).subscribe(
        observer => {},
        error => {console.log("Post management : Error")},
        () => {console.log("Post management: Done")}
      )
    this.closeDialog()
  }

  editManagement() {
    this.roomManagements.forEach(manage => {
      if(manage.startDate && manage.endDate){
        if(new Date(manage.startDate) <= this.date && this.date <= new Date(manage.endDate)){
          this.id = manage.id as number
        }
      }
    })
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
      this.management.id = this.id
      this.management.capacity = this.capacity
      this.management.userResponseDTO = this.user
      this.management.roomResponseDTO = this.room
      this.patchManagementSubscription = this.managementService.patchManagement(this.management).subscribe(
        observer => {},
        error => {console.log("Management not updated")},
        () => {console.log("Management updated"), this.getAllRoomStatus()}
      )
    this.closeDialog()
  }

  getManagementByRoom(room : Room) {
    this.getManagementByRoomSubscription = this.managementService.getManagementByRoom(room.id as number).subscribe(
      observer => {this.roomManagements = [...observer]},
      error => {console.log("Management not found")},
      () => {console.log("Management found", this.roomManagements)}
    )
  }

  getManagementByDateAndRoom(date : Date, roomNumber : number){
    console.log(date)
    this.getManagementByDateAndRoomSubscription = this.managementService.getManagementByDateAndRoom(date, roomNumber).subscribe(
      observer => {
        this.managementFound = {...observer}},
      error => console.log("Management not found"),
      () => {console.log("Management found")}
    )
  }

  deleteManagementById(id : number | undefined){
    console.log(this.managementFound)
    if (this.managementFound){
      this.deleteManagementByIdSubscription = this.managementService.deleteManagementById(id).subscribe(
        observer => {},
        error => {console.log("Management to delete not found")},
        () => {
          console.log("Management deleted")
          this.closeDialog()}
      )
    }
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
    let managementDate : Date = this.myFormatDate(this.date) as unknown as Date
    this.getManagementByDateAndRoom(managementDate, this.roomStatus.roomNumber)
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



  ngOnDestroy(): void {
    this.getAllRoomStatusSubscription?.unsubscribe()
    this.getUserByEmailSubscription?.unsubscribe()
    this.getAllBookingsSubscription?.unsubscribe()
    this.getRoomByRoomNumberSubscription?.unsubscribe()
    this.postManagementSubscription?.unsubscribe()
    this.getManagementByRoomSubscription?.unsubscribe()
    this.patchManagementSubscription?.unsubscribe()
    this.getManagementByDateAndRoomSubscription?.unsubscribe();
    this.deleteManagementByIdSubscription?.unsubscribe();
  }

}
