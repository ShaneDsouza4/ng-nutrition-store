import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiCartUrl = environment.apiUrl + "/cart";
  private apiCheckoutUrl = environment.apiUrl + "/checkout";
  cartItems: Product[] = [];

  constructor(
    private _http: HttpClient
  ) { }

  addToCart(product: Product): Observable<Product> {
    return this._http.post<Product>(this.apiCartUrl, product);
  }
  addToCartX(product: Product) {
    this.cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(this.cartItems))
  }

  getCartItems(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiCartUrl);
  }
  getCartItemsX(): Product[] {
    let savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  clearCart(): Observable<void> {
    return this._http.delete<void>(this.apiCartUrl);
  }
  clearCartX(): void {
    this.cartItems = [];
    localStorage.setItem("cart", JSON.stringify(this.cartItems))
  }

  checkoutCart(products: Product[]): Observable<void> {
    return this._http.post<void>(this.apiCheckoutUrl, products)
  }

  checkoutCartX(products: Product[]) {
    this.cartItems = products;
    this.cartItems = [];
    localStorage.setItem("cart", JSON.stringify(this.cartItems))

  }





}
