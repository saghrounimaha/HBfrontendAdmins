import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VariationOption } from '../models/varaitionoption.model';

@Injectable({
  providedIn: 'root'
})
export class VariationOptionService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }


  createVariation(variationoption: any) {
    const API_URL = `${this.baseUrl}/api/variation-options`
    return this.http.post(API_URL, variationoption);
  }
  getAllVarition(){
    const API_URL = `${this.baseUrl}/api/variation-options`
    return this.http.get(API_URL);
  }

  deleteVarition(variationoptionId: number){
    const API_URL = `${this.baseUrl}/api/variation-options/${variationoptionId}`;
    return this.http.delete(API_URL);
  }

  updateVariation(id: number, variationoption: VariationOption) {
    const API_URL = `${this.baseUrl}/api/variation-options/${id}`;
    return this.http.put( API_URL,variationoption);
  }


  searchVaritionByName(searchQuery: string) {
    const url = `${this.baseUrl}/api/variations/search?name=${searchQuery}`;
    return this.http.get(url);
  }


}
