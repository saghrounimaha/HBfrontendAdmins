import { Component, OnInit } from '@angular/core';
import { AddPromortionDialogComponent } from '../add-promortion-dialog/add-promortion-dialog.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  constructor(private matDialog:MatDialog){}

    ngOnInit(): void {

    }

  openDialog(){
  this.matDialog.open(AddPromortionDialogComponent),{
     width:'350px'
  }
  }
}
