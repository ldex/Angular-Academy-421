import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://671d383409103098807c943e.mockapi.io/api/products/';

  products$: Observable<Product[]>

  constructor(private http: HttpClient) {
    this.initProducts()
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  insertProduct(newProduct: Partial<Product>): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id: number): Observable<Product> {
    return this
              .products$
              .pipe(
                map(products => products.find(product => product.id == id))
              )
  }

  resetList() {
    this.initProducts()
  }

  initProducts() {
      this.products$ = this
                        .http
                        .get<Product[]>(this.baseUrl)
                        .pipe(
                          tap(console.table),
                          delay(1500), // Pour la démo!!
                          shareReplay()
                        )
  }
}
