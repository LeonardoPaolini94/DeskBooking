import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../models/User";
import {UserService} from "./user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  data$: BehaviorSubject<Blob> = new BehaviorSubject<Blob>(new Blob());
  constructor() { }

  update(avatar: Blob) {
    this.data$.next(avatar);
  }



}
