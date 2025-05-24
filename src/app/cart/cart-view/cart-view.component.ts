import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this._cartService.getCartItems().subscribe(x => {
    //   this.cartItems = x;
    //   this.totalPrice = this.getTotalPrice();
    // })

    this.cartItems = this._cartService.getCartItemsX();
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice(): number {
    let total = 0;

    for (let item of this.cartItems) {
      total += item.price;
    }

    return total;

  }

  clearCart(): void {
    //this._cartService.clearCart().subscribe();
    this._cartService.clearCartX();
    this._router.navigate(['/'])
    this._snackBar.open("Cart cleared", "", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  checkout(): void {
    //this._cartService.checkoutCart(this.cartItems).subscribe();
    this._cartService.checkoutCartX(this.cartItems);
    this._router.navigate(['/'])
    this._snackBar.open("Thank you for using Checkout.", "", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


}
