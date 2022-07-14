import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth.service";
import {UserLogin} from "../../../core/models/UserLogin";
import {Router} from "@angular/router";
import {UserService} from "../../../core/service/user-service/user.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm: FormGroup

  getUserByEmailSubscription : Subscription


  constructor(private authService : AuthService,
              private route: Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(7)])
    })
  }

  async submit() {

    if (this.loginForm.valid) {

      this.getUserByEmail()

      let user: UserLogin = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      await this.authService.login(user).then(user => {
        user.user?.getIdToken().then( token => {
          sessionStorage.setItem('token', token)});
        }).catch(reason => {
         console.log(reason);
        });

      await this.route.navigateByUrl('/home').then();
    }
  }



  getUserByEmail(){
    //   this.getUserByEmailSubscription = this.userService.getUserByEmail(this.loginForm.get('email')?.value).subscribe(
    //     observer => {this.authService.setUser(observer) },
    //     error => {console.log(error)},
    //     () => {console.log("Games found!")
    //     })
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.authService.setUser([...observer].find(user => user.email == this.loginForm.get('email')?.value)) },
      error => {console.log(error)},
      () => {console.log("User found!")
      })

  }


  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe()
  }
}
