import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
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
        name: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
        lastname: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
        email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
        phone: new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
        password: new FormControl('',[Validators.required ,Validators.minLength(7)]),
        confirmPassword: new FormControl('',[Validators.required ,Validators.minLength(7)])
      },{validators: this.passwordMatcher}
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

   passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
     const passwordcontrol = c.get('password');
     const confirmPasswordcontrol = c.get('confirmPassword');

    if (passwordcontrol?.pristine || confirmPasswordcontrol?.pristine) {
      return null;
    }

    if (passwordcontrol?.value === confirmPasswordcontrol?.value) {
      return null;
    }
    return { 'match': true };
  }
}
