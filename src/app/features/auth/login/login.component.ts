import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth.service";
import {UserLogin} from "../../../core/models/UserLogin";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../../core/service/user-service/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  hide = true;

  loginForm: FormGroup
  checkEmail: boolean;
  private verifyEmailSubscription: Subscription;


  constructor(private authService : AuthService,
              private route: Router,
              private userService : UserService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(7)])
    })
  }

  submit(){
    this.verifyEmail(this.loginForm.get('email')?.value)
  }

  async login() {

    this.checkEmail = false

    if (this.loginForm.valid) {

      let user: UserLogin = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      await this.authService.login(user).then(user => {
        user.user?.getIdToken().then( token => {
          sessionStorage.setItem('token', token)})
          sessionStorage.setItem('email', this.loginForm.get('email')?.value )
        }).catch(reason => {
         console.log(reason);
        });

      this.route.navigateByUrl('/home').then();
    }
  }

  emailNotExist(){
    console.log('email Not exists')
    this.checkEmail = true
  }




  verifyEmail(email : string){
    this.verifyEmailSubscription = this.userService.getUserByEmail(email).subscribe(
      observer => {this.login()},
      () => {this.emailNotExist()},
      () => {console.log("User found!")
      })
  }


  ngOnDestroy(): void {
    this.verifyEmailSubscription?.unsubscribe()
  }


}
