import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  patchUser(user: User, idUser: number): Observable<User>{
    return this.http.patch<User>("http://localhost:3000/users" + "/" + idUser, user)
  }

  // Funziona soltanto se è presente nel back una custom query specifica

  // getUserByEmail(email: string | null) : Observable<User> {
  //   return this.http.get<User>("http://localhost:3000/users/" + email)
  // }

  getAllUser() : Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users")
  }

  patchAvatar(idUser: number, formData: FormData): Observable<any>{

    return this.http.patch("http://localhost:8080/api/v1/user/" + idUser + "/avatar", formData)
  }

  getAvatar(idUser : number) : Observable<Blob>{
    console.log("sono nel service")
    return this.http.get("http://localhost:8080/api/v1/user/" + idUser + "/profileImage" ,  { responseType: 'blob' } )
  }
}
