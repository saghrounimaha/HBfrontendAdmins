import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8080/api/reviews';
  constructor(private http: HttpClient) { }


  getRaitingbyIdProuduct(productId: number){
    const API_URL = `${this.baseUrl}/${productId}/reviews`;
    return this.http.get(API_URL);
  }
  countReview(){
    const API_URL = `${this.baseUrl}/rating`;
    return this.http.get(API_URL);
  }

}
