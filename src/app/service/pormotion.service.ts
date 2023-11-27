import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PormotionService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  createVariation(pomotion: any) {
    const API_URL = `${this.baseUrl}`
    return this.http.post(API_URL, pomotion);
  }
  getAllVarition(){
    const API_URL = `${this.baseUrl}/api/promotions`
    return this.http.get(API_URL);
  }

  deleteVarition(pomotionid: number){
    const API_URL = `${this.baseUrl}//api/promotions/${pomotionid}`;
    return this.http.delete(API_URL);
  }

  updateVariation(id: number, pomotion: Promotion) {
    const API_URL = `${this.baseUrl}/api/promotions/${id}`;
    return this.http.put( API_URL,pomotion);
  }


  // searchVaritionByName(searchQuery: string) {
  //   const url = `${this.baseUrl}/api/variations/search?name=${searchQuery}`;
  //   return this.http.get(url);
  // }
}
