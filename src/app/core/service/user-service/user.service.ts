import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  postUser(user : User) : Observable<User> {
    return this.http.post<User>("http://localhost:3000/users", user)
  }

  // Funziona soltanto se è presente nel back una custom query specifica

  // getUserByEmail(email: string | null) : Observable<User> {
  //   return this.http.get<User>("http://localhost:3000/users/" + email)
  // }

  getAllUser() : Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users")
  }
}
