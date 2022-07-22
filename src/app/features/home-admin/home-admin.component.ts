import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor( private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(dialog : any) {
    this.dialog.open(dialog)
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}
