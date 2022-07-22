import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/User";
import {AuthService} from "../../../core/service/auth.service";
import {UserService} from "../../../core/service/user-service/user.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  emailCheckExist: boolean;
  phoneCheckExist: boolean;

  private getUserByEmailSubscription: Subscription;
  private patchUserSubscription: Subscription;
  private verifyEmailSubscription: Subscription;
  private verifyPhoneNumberSubscription: Subscription;
  isEditingProfile: boolean= false;
  isEditingPassword: boolean=false;
  editProfileForm: FormGroup;
  avatarForm: FormGroup;
  editPasswordForm: FormGroup;
  user: User | undefined;
  oldEmail: string | undefined;
  oldPassword: string | undefined;


  fileToUpload: File | null = null;
  formData: FormData




  constructor(private authService: AuthService, private userService: UserService, private afAuth: AngularFireAuth, private dialog : MatDialog) { }

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
    this.editPasswordForm = new FormGroup({
      oldPassword: new FormControl('',[Validators.required, Validators.minLength(7)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(7)])
    },{validators: this.passwordMatcher}
    )

    this.avatarForm = new FormGroup({
      avatar: new FormControl('',[Validators.required])
    })
  }

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getUserByEmail(email).subscribe(
      observer => {this.user = {...observer}},
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
  }

  editPassword() {
    this.isEditingPassword=true;
    this.editPasswordForm.patchValue({password: this.user?.password})
  }

  editProfile() {
    this.isEditingProfile=true;
    this.editProfileForm.patchValue({firstName: this.user?.firstName, lastName: this.user?.lastName, email: this.user?.email, phoneNumber: this.user?.phoneNumber,})
  }

  //---------------------------------------------------------------------------------------
  emailExist(){
    this.emailCheckExist = true
  }

  emailNotExist(){
    this.emailCheckExist = false
    this.confirmEditProfile();
  }

  phoneNumberExist(){

  }

  phoneNumberNotExist(){

  }

  async submitProfile() {
    this.oldEmail=this.user?.email;
    this.user!.email = this.editProfileForm.controls['email'].value;
    this.verifyEmail(this.user!.email)
  }

  confirmEditProfile() {
    this.user!.firstName = this.editProfileForm.controls['firstName'].value;
    this.user!.lastName = this.editProfileForm.controls['lastName'].value;
    this.user!.email = this.editProfileForm.controls['email'].value;
    this.user!.phoneNumber = this.editProfileForm.controls['phoneNumber'].value;
    this.patchUser(this.user!, this.user!.id!);
    this.updateFirebaseEmail(this.user?.email!);
    sessionStorage.removeItem('email');
    sessionStorage.setItem('email', this.user!.email);
    this.isEditingProfile= false;
    setTimeout(()=> {this.ngOnInit()},20)
  }

  verifyEmail(email : string){
    this.verifyEmailSubscription = this.userService.getUserByEmail(email).subscribe(
      observer => {
        if(observer.email == sessionStorage.getItem('email')){
          this.emailNotExist()
        }else{
          this.emailExist()
        }
      },
      () => {this.emailNotExist()},
      () => {console.log("User found!")
      })
  }

  verifyPhoneNumber(phoneNumber : string){
    this.verifyPhoneNumberSubscription = this.userService.getUserByEmail(phoneNumber).subscribe(
      observer => {

      },
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
  }


//---------------------------------------------------------------------------------------


  async submitPassword(){
    this.confirmEditPassword();
    this.isEditingPassword=false;
  }

  confirmEditPassword() {
    this.oldPassword= this.user?.password;
    this.user!.password = this.editPasswordForm.controls['newPassword'].value;
    this.patchUser(this.user!, this.user!.id!);
    this.updateFirebasePassword(this.user?.password!);
    sessionStorage.removeItem('password');
    sessionStorage.setItem('password', this.user!.password);
  }

  patchUser(user : User, idUser: number){
    this.patchUserSubscription = this.userService.patchUser(user, idUser).subscribe(
      observer => { this.user = {...observer} },
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

  async updateFirebaseEmail(email: string){
    this.afAuth.signInWithEmailAndPassword(this.oldEmail!, this.user?.password!)
      .then((userCredential)=>{
        userCredential!.user!.updateEmail(email);
        console.log("user email updated in firebase")
      })
  }

    async updateFirebasePassword(password: string){
    this.afAuth.signInWithEmailAndPassword(this.user?.email!, this.oldPassword!)
      .then((userCredential)=>{
        userCredential!.user!.updatePassword(password);
       console.log("user password updated in firebase")
    })
  }

  passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const oldPasswordControl = c.get('oldPassword');
    const newPasswordControl = c.get('newPassword');
    const confirmPasswordControl = c.get('confirmPassword');

    if (newPasswordControl?.pristine || confirmPasswordControl?.pristine) {
      return null;
    }

    if (newPasswordControl?.value === confirmPasswordControl?.value) {
      return null;
    }
    if (oldPasswordControl?.pristine || this.user?.password){
      return null;
    }
    if (oldPasswordControl?.value === this.user?.password) {
      return null;
    }

    return { 'match': true };
  }


  onFileSelected(event: any) {
    this.fileToUpload  = event.target.files[0];
  }

   onSaveFile() {
    this.formData = new FormData();
    this.formData.append('avatar', this.fileToUpload as File);

    if(this.user?.id){
      this.closeDialog()
      return this.userService.patchAvatar(this.user?.id , this.formData).subscribe()
    }
    else {
      return this.closeDialog()
    }
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe();
    this.patchUserSubscription?.unsubscribe()
    this.verifyEmailSubscription?.unsubscribe()
    this.verifyPhoneNumberSubscription?.unsubscribe()
  }


}
