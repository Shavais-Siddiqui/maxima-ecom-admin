import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = 'http://localhost:3000/api/'
  constructor(private http: HttpClient) { }

  getProdcuts() {
    return this.http.get(this.baseUrl + 'all-products');
  }

  getCategories() {
    return this.http.get(this.baseUrl + 'all-categories');
  }

  addProduct(data) {
    return this.http.post(this.baseUrl + 'add-product', data);
  }

  addCategory(data) {
    return this.http.post(this.baseUrl + 'add-category', data);
  }

  getDropDowns() {
    return this.http.get(this.baseUrl + 'all-dropdowns');
  }

  updateDropDowns(data, id) {
    return this.http.post(this.baseUrl + 'update-dropdown/' + id, data);
  }
}