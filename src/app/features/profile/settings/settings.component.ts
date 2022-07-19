import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isEditingProfile:boolean= false;
  isEditingPassword:boolean=false;
  editProfileForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
      lastName: new FormControl('', [Validators.required,Validators.pattern("^[a-z A-Z]*$"),Validators.minLength(2), Validators.maxLength(40)]),
      email: new FormControl('',[Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")])

    })
  }


  editPassword() {
    this.isEditingPassword=true;
  }

  editProfile() {
    this.isEditingProfile=true;
  }

  async submitProfile() {

  }
}
