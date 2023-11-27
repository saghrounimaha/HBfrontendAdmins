import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  constructor(private http: HttpClient) { }


  addProduct(product: any) {
    const API_URL = `${this.baseUrl}/add-with-items?id_category=${product.id_category}`;
    return this.http.post(API_URL, product.productRequest);
  }
  addimageproduct(id: number, product: Product) {
    const API_URL = `${this.baseUrl}/${id}/images`;
    return this.http.put( API_URL,product);
  }


  }










