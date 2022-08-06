import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Management} from "../../models/Management";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private httpClient : HttpClient) { }

  getAllManagement() : Observable<Management[]>{
    return this.httpClient.get<Management[]>("http://localhost:8080/api/v1/management");
  }

  getManagementById(id : number) : Observable<Management>{
    return this.httpClient.get<Management>("http://localhost:8080/api/v1/management/" + id);
  }

  postManagement(Management : Management) : Observable<Management> {
    return this.httpClient.post<Management>("http://localhost:8080/api/v1/management", Management)
  }
  deleteManagementById(id : number | undefined) : Observable<Management>{
    return this.httpClient.delete<Management>("http://localhost:8080/api/v1/management/" + id);
  }

  getManagementByRoom(id : number) : Observable<Management[]> {
    return this.httpClient.get<Management[]>("http://localhost:8080/api/v1/management/room/" + id)
  }

  patchManagement(management : Management) : Observable<Management> {
    return this.httpClient.patch<Management>("http://localhost:8080/api/v1/management/" + management.id, management)
  }

  getManagementByDateAndRoom(date : String, roomNumber : number) : Observable<Management> {
    return this.httpClient.get<Management>("http://localhost:8080/api/v1/management/date/" + date + "/room/" + roomNumber)
  }
}
