import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : User | undefined

  constructor(private authService : AuthService,
              private route : Router){ }

  ngOnInit(): void {
    this.user = this.authService.getUser()
  }


  async logout() {
    this.authService.signout().then(()=>
      sessionStorage.removeItem('token'));
    this.authService.removeUser()
    this.route.navigateByUrl('/auth/login').then();
    alert("Logged Out")
  }

}
