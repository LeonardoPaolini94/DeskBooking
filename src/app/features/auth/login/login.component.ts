import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/service/auth.service";
import {UserLogin} from "../../../core/models/UserLogin";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup


  constructor(private authService : AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(7)])
    })
  }

  async submit() {

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




}
