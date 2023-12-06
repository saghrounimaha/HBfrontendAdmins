import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductItem } from '../models/ProductItem.model';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  private baseUrl = 'http://localhost:8080/api/product-items';
  constructor(private http: HttpClient) { }




  getAllProductItem(){
    const API_URL = `${this.baseUrl}`
    return this.http.get(API_URL);
  }


  getByIdProductItem(productItemId: number){
    const API_URL = `${this.baseUrl}/${productItemId}/product-items`;
    return this.http.get(API_URL);
  }



  deleteProductItems(productItemId: number) {
    const url = `${this.baseUrl}/${productItemId}`;
    return this.http.delete(url);
  }
  updateProductItem(productItemId: number,productItem:any) {
    const url = `${this.baseUrl}/${productItemId}`;
    return this.http.put(url,productItem);
  }
  }



