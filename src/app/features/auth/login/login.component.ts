import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  submit() {

  }
}
