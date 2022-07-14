import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {AuthService} from "../../../core/service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../core/service/user-service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  postUserSubscription : Subscription

  userArray : User[]


  constructor(private authService : AuthService,
              private route : Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
        lastname: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
        email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
        phone: new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
        password: new FormControl('',[Validators.required ,Validators.minLength(7)]),
        confirmPassword: new FormControl('',[Validators.required ,Validators.minLength(7)])
      },{validators: this.passwordMatcher}
    );
  }


  async onSubmit() {
  let newSignup : User = {
    id : this.userArray?.length+1,
    name : this.signupForm.value.name.trim(),
    lastname : this.signupForm.value.lastname.trim(),
    phone : this.signupForm.value.phone,
    email : this.signupForm.value.email.trim(),
    password : this.signupForm.value.password.trim(),
    avatar : "src/assets/Sample_User_Icon.png",
    role :  {
      id : 1,
      name : "user"
    }
  };

  this.userArray?.push(newSignup)

  let authSignUp

    if (this.signupForm.valid) {
      authSignUp = {
        email: newSignup.email,
        password: newSignup.password
      }

      await this.authService.signup(authSignUp).then(() => {
        this.route.navigateByUrl('/auth/login').then();
        this.postUserSubscription = this.userService.postUser(newSignup).subscribe(
          observer => {},
          error => {console.log("Something went wrong :(")},
          () => {console.log("User inserted!")}
        )
      }).catch((error) => {
        console.log(error);
      });
    }
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
