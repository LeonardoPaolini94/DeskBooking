import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : User | undefined

  constructor(private authService : AuthService,
              private route : Router, public dialog : MatDialog){ }

  ngOnInit(): void {
    this.user = this.authService.getUser()
    console.log(this.user?.avatar)
  }


  async logout() {
    this.authService.signout().then(()=>
      sessionStorage.removeItem('token'));
    this.authService.removeUser()
    this.route.navigateByUrl('/auth/login').then();
    this.closeDialog();
  }


  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }

}
