import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }


  createCategory(formData: FormData): Observable<any> {
    const API_URL = `${this.baseUrl}/api/categories`;
    //const params = new HttpParams().set("category", category);
    return this.http.post<any>(API_URL, formData );
  }
  getAllCategories(){
    const API_URL = `${this.baseUrl}/api/categories`
    return this.http.get(API_URL);
  }

  deleteCategory(categoryId: number){
    const API_URL = `${this.baseUrl}/api/categories/${categoryId}`;
    return this.http.delete(API_URL);
  }

  updateCategory(categoryId:number, formData: FormData){
    const API_URL = `${this.baseUrl}/api/categories/${categoryId}`;
    return this.http.put(API_URL, formData);
  }


  searchCategoriesByName(searchQuery: string) {
    const url = `${this.baseUrl}/api/categories/search?name=${searchQuery}`;
    return this.http.get(url);
  }



}
