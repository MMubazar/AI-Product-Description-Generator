import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api="http://localhost:5000/api";

  constructor(private http:HttpClient) {}

  generateDescription(data:any){
    return this.http.post(this.api + "/products/generate",data);
  }

  saveProduct(data:any){
    return this.http.post(this.api + "/products/save",data);
  }

}