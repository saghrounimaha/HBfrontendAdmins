import { Variation } from 'src/app/models/variation.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariationService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }


  createVariation(variation: any) {
    const API_URL = `${this.baseUrl}/api/variations`
    return this.http.post(API_URL, variation);
  }
  getAllVarition(){
    const API_URL = `${this.baseUrl}/api/variations`
    return this.http.get(API_URL);
  }

  deleteVarition(categoryId: number){
    const API_URL = `${this.baseUrl}/api/variations/${categoryId}`;
    return this.http.delete(API_URL);
  }

  updateVariation(id: number, variation: Variation) {
    const API_URL = `${this.baseUrl}/api/variations/${id}`;
    return this.http.put( API_URL,variation);
  }


  searchVaritionByName(searchQuery: string) {
    const url = `${this.baseUrl}/api/variations/search?name=${searchQuery}`;
    return this.http.get(url);
  }


}
