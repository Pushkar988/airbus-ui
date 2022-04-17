import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './model/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  getproduct() {
    return this.http.get(environment.baseUrl + '/product', {
      headers: this.headers,
    });
  }

  getproductByCategory(category) {
    return this.http.get(
      environment.baseUrl + '/product?category=' + category,
      {
        headers: this.headers,
      }
    );
  }

  getproductByProductId(id) {
    return this.http.get(environment.baseUrl + '/product/' + id, {
      headers: this.headers,
    });
  }

  saveProduct(product: any) {
    return this.http.post(environment.baseUrl + '/product', product, {
      headers: this.headers,
    });
  }
}
