import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {UserLogin} from "../models/UserLogin";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  auth = getAuth();

  constructor(private angularFireAuth: AngularFireAuth) {}

  login(userLogin: UserLogin) {
    return  signInWithEmailAndPassword(this.auth,userLogin.email, userLogin.password);
  }

  signup(user: UserLogin) {
    return createUserWithEmailAndPassword(this.auth,user.email, user.password);
  }

  signout(){
    return signOut(this.auth);
  }

  //--------------------------------------------------------------------

  private user : User | undefined

  setUser(user: User | undefined){
    this.user = user
  }

  getUser(){
    return this.user
  }

  removeUser(){
    this.user = undefined
  }

}
