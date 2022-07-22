import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/User";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {UserService} from "../service/user-service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{

  @Input() userByUpdate: User | undefined;
  user : User | undefined
  private getUserByEmailSubscription: Subscription;
   imageToShow: any = null;

  constructor(private authService : AuthService,
              private route : Router,
              private dialog : MatDialog,
              private userService : UserService){ }



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
      observer => {this.user = {...observer} },
      () => {console.log("User not found!")},
      () => {console.log("User found!")
      })
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



   getAvatarImage(userId : number){
    this.userService.getAvatar(userId).subscribe(image => this.createImage(image),
      err => this.handleImageRetrievalError(err));
  }

  private createImage(image: Blob) {
    console.log(image)
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
      }, false);

      reader.readAsDataURL(this.imageToShow);
      console.log(this.imageToShow)
    }
  }

  private handleImageRetrievalError(err: any) {
    console.error(err);
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe()
  }
}
