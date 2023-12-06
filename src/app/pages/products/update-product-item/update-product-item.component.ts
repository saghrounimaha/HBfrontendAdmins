import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-product-item',
  templateUrl: './update-product-item.component.html',
  styleUrls: ['./update-product-item.component.scss']
})
export class UpdateProductItemComponent implements OnInit{


  ngOnInit(): void {
    console.log("hi")
  }


}
