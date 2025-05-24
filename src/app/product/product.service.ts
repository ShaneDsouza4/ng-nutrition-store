import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { SUPPLEMENTS } from "../constants/supplements";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiCartUrl = environment.apiUrl + "/products";

  constructor(
    private _http: HttpClient
  ) { }


  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiCartUrl);
  }

  getProductsX() {
    return SUPPLEMENTS;

  }

}
