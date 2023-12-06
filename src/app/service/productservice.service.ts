import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductItem } from '../models/ProductItem.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private apiUrl = 'http://localhost:8080/api/product-items';
  constructor(private http: HttpClient) { }


  addProduct(product: any,id_category:number) {
    const API_URL = `${this.baseUrl}/add-with-items/${id_category}`;
    return this.http.post(API_URL, product);
  }
  addimageproduct(id: number, formData: FormData) {
    const API_URL = `${this.baseUrl}/${id}/images`;
    return this.http.post( API_URL,formData);
  }

  getAllProduct(){
    const API_URL = `${this.baseUrl}/getShopProduct`
    return this.http.get(API_URL);
  }

  deleteProduct(productId: number) {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete(url);
  }
  getByIdProduct(productId: number){
    const API_URL = `${this.baseUrl}/${productId}`;
    return this.http.get(API_URL);
  }
  updateImage(id: number, formData: FormData) {
    const API_URL = `${this.baseUrl}/${id}/addImage`;
    return this.http.post( API_URL,formData);
  }


  getImageProduct(productId: number){
    const API_URL = `${this.baseUrl}/${productId}/listImages`;
    return this.http.get(API_URL);
  }

  updateProduct(productId: number,product:any,idCategory:number,idPromotion:number) {
    const url = `${this.baseUrl}/${productId}/category/${idCategory}/promotion/${idPromotion}`;
    return this.http.put(url,product);
  }


  deleteProductItems(productItemId: number) {
    const url = `${this.apiUrl}/${productItemId}`;
    return this.http.delete(url);
  }
  updateProductItem(productItemId: number,productItem:ProductItem) {
    const url = `${this.apiUrl}/${productItemId}`;
    return this.http.put(url,productItem);
  }

  }










