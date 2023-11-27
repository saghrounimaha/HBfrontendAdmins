import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product-item',
  templateUrl: './update-product-item.component.html',
  styleUrls: ['./update-product-item.component.scss']
})
export class UpdateProductItemComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: any }) {}

  ngOnInit(): void {
    console.log(this.data.item)
  }


}
