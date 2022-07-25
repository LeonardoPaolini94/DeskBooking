import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/User";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {UserService} from "../service/user-service/user.service";
import {AvatarService} from "../service/avatar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{

  @Input() userByUpdate: User | undefined;
  user : User | undefined
  private getUserByEmailSubscription: Subscription;
  private avatarSubscription : Subscription
   imageToShow: any = null;

  constructor(private authService : AuthService,
              private route : Router,
              private dialog : MatDialog,
              private userService : UserService,
              private avatarService : AvatarService){ }



  ngOnInit(): void {

    let email = sessionStorage.getItem('email')
    if(email){
      this.getUserByEmail(email)
    }
  }

  ngOnChanges(): void {
    this.user = this.userByUpdate;
  }

  getUserByEmail(email : string){
    this.getUserByEmailSubscription = this.userService.getUserByEmail(email).subscribe(
      observer => {this.user = {...observer} , sessionStorage.setItem('phoneNumber',{...observer}.phoneNumber),
        this.getAvatarImage(this.user?.id)},
      () => {console.log("User not found!")},
      () => {
        this.avatarSubscription = this.avatarService.data$.subscribe(val => this.createImage(val))})
  }


  async logout() {
    this.authService.signout().then(()=>
      this.authService.removeUser());
    this.closeDialog();
    setTimeout(()=>{this.route.navigateByUrl('/auth/login').then()},10)
  }


  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }



   getAvatarImage(userId : number | undefined){
    if(userId){
      this.userService.getAvatar(userId).subscribe(image => this.createImage(image),
        err => this.handleImageRetrievalError(err));
    }

  }

  private createImage(image: Blob) {
    const preview = document.getElementById("headerAvatar") as HTMLImageElement;
    console.log(image)
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
          preview.src = reader.result;
        }
      }, false);

      if(image){
        reader.readAsDataURL(image);
      }
      console.log(this.imageToShow)
    }
  }

  private handleImageRetrievalError(err: any) {
    console.error(err);
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe()
    this.avatarSubscription?.unsubscribe()
  }
}
