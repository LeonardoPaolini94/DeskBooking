import {Component, Input, OnInit} from '@angular/core';
import {RoleResponseDTO} from "../../core/models/RoleResponseDTO";
import firebase from "firebase/compat";
import {User} from "../../core/models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: string;

  constructor() {
    this.role = sessionStorage.getItem('role')!;
    console.log('costruttore', this.role)
  }

  ngOnInit(): void {
    debugger
    console.log('ciao', this.role);
  }

}
