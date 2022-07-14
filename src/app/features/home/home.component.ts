import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user : User | undefined

  constructor(private authService : AuthService,
              private route : Router){ }

  ngOnInit(): void {
    this.user = this.authService.getUser()
  }


  async logout() {
    this.authService.signout().then(()=>
      sessionStorage.removeItem('token'));
    this.route.navigateByUrl('/auth/login').then();
    alert("Logged Out")
  }
}
