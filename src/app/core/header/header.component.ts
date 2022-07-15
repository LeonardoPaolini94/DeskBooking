import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/User";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {UserService} from "../service/user-service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{

  user : User | undefined
  private getUserByEmailSubscription: Subscription;

  constructor(private authService : AuthService,
              private route : Router,
              private dialog : MatDialog,
              private userService : UserService){ }



  ngOnInit(): void {
    let email = sessionStorage.getItem('email')
    if(email){
      this.getUserByEmail(email)
    }
  }

  getUserByEmail(email : string){
    //   this.getUserByEmailSubscription = this.userService.getUserByEmail(this.loginForm.get('email')?.value).subscribe(
    //     observer => {this.authService.setUser(observer) },
    //     error => {console.log(error)},
    //     () => {console.log("Games found!")
    //     })
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.user = [...observer].find(user => user.email == email) },
      error => {console.log("User not found!")},
      () => {console.log("User found!")
      })

  }


  async logout() {
    this.authService.signout().then(()=>
      this.authService.removeUser());

    this.route.navigateByUrl('/auth/login').then();
    this.closeDialog();
  }


  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription.unsubscribe()
  }

}
