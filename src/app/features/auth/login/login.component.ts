import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLoginService} from "../../../core/service/user-login.service";
import {first, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm: FormGroup;

  loading = false;
  submitted = false;

  userLoginSubscription : Subscription


  constructor(private userLoginService : UserLoginService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(7)])
    })
  }

  submit() {
    let userLogin = this.loginForm.value

    this.userLoginSubscription = this.userLoginService.login(userLogin.email, userLogin.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/home");
        },
        error: error => {
          // inserire modale di errore
          this.loading = false;
        }
      });
  }


  ngOnDestroy(): void {
    this.userLoginSubscription?.unsubscribe()
  }
}
