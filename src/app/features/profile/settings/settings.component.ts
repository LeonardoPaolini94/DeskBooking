import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {AuthService} from "../../../core/service/auth.service";
import {UserService} from "../../../core/service/user-service/user.service";
import {Subscription} from "rxjs";
import {getAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private getUserByEmailSubscription: Subscription;
  private patchUserSubscription: Subscription;
  isEditingProfile: boolean= false;
  isEditingPassword: boolean=false;
  editProfileForm: FormGroup;
  user: User | undefined;
  auth= getAuth();

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    let email = sessionStorage.getItem('email')
    if(email){
      this.getUserByEmail(email)
    }
    this.editProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
      lastName: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
      email: new FormControl('',[Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")])
    });
  }

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getUserByEmail(email).subscribe(
      observer => {this.user = {...observer} },
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
  }

  editPassword() {
    this.isEditingPassword=true;
  }

  editProfile() {
    this.isEditingProfile=true;
    this.editProfileForm.patchValue({firstName: this.user?.firstName, lastName: this.user?.lastName, email: this.user?.email, phoneNumber: this.user?.phoneNumber,})
  }

  async submitProfile() {
    this.confirmEditProfile();
    this.isEditingProfile= false;
  }

  confirmEditProfile() {
    this.user!.firstName = this.editProfileForm.controls['firstName'].value;
    this.user!.lastName = this.editProfileForm.controls['lastName'].value;
    this.user!.email = this.editProfileForm.controls['email'].value;
    this.user!.phoneNumber = this.editProfileForm.controls['phoneNumber'].value;
    this.patchUser(this.user!, this.user!.id!);
    sessionStorage.removeItem('email');
    sessionStorage.setItem('email', this.user!.email);
    setTimeout(()=> {this.ngOnInit()},10)
  }




  patchUser(user : User, idUser: number){
    this.patchUserSubscription = this.userService.patchUser(user, idUser).subscribe(
      observer => { this.user = {...observer} },
      () => {console.log("User not found!")},
      () => {console.log("User patched!")
      })
  }

  updateFirebaseEmail(){

  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe();
    this.patchUserSubscription?.unsubscribe()
  }


}
