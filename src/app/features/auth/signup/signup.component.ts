import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
        phone: new FormControl('',Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('',Validators.required)
      }/*,{validators: this.checkPasswords}*/
    );
  }


  onSubmit() {
  let newSignup : User = {
    name : this.signupForm.value.name,
    lastname : this.signupForm.value.lastname,
    phone : this.signupForm.value.phone,
    email : this.signupForm.value.email,
    password : this.signupForm.value.password,
    avatar : "src/assets/Sample_User_Icon.png",
    role :  {
      id : 1,
      name : "user"
    }
  };
  console.log(newSignup);
  }
/*  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password');
    let confirmPass = group.get('confirmPassword')
    return pass === confirmPass ? null : { notSame: true }
  }*/
}
