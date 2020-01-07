import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = 'https://maximaecommerceserver.herokuapp.com/api/'
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

  updateProduct(id, data) {
    return this.http.patch(this.baseUrl + 'update-product/' + id, data);
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
