import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {AuthService} from "../../../core/service/auth.service";
import {UserService} from "../../../core/service/user-service/user.service";
import {Subscription} from "rxjs";
import {firebaseApp$} from "@angular/fire/app";
import {getAuth} from "@angular/fire/auth";
import {MatDialog} from "@angular/material/dialog";

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
  avatarForm: FormGroup;
  user: User | undefined;
  auth= getAuth();

  loading: boolean = false; // Flag variable
  file: File | null = null;  //avatar upload

  constructor(private authService: AuthService, private userService: UserService, private dialog : MatDialog) { }

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

    this.avatarForm = new FormGroup({
      avatar: new FormControl('',[Validators.required])
    })
  }

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getAllUser().subscribe(
      observer => {this.user = [...observer].find(user => user.email == email) },
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
  }

  patchUser(user : User, idUser: number){
    this.patchUserSubscription = this.userService.patchUser(user, idUser).subscribe(
      observer => { this.user= {...observer} },
      () => {console.log("User not found!")},
      () => {console.log("User patched!")
      })
  }
  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  updateFirebaseEmail(){

  }

  // on file select event
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatarForm.patchValue({
        fileSource: file
      });
    }
  }

  uploadAvatar() {
    const formData = new FormData();
    formData.append('file', this.avatarForm.get('avatar')?.value);


    this.file = this.avatarForm.value as File
    this.loading = !this.loading;
    console.log(this.file);
    if(this.user?.id && this.file){
      this.userService.patchAvatar(this.user?.id, this.file).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.loading = false; // Flag variable
          }
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.getUserByEmailSubscription.unsubscribe();
  }


}
