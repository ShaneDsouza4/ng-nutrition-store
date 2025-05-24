import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = "";

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _snackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    // this._ProductService.getProducts().subscribe(x => {
    //   this.products = x;
    //   this.filteredProducts = x;
    // })

    this.products = this._ProductService.getProductsX();
    this.filteredProducts = this._ProductService.getProductsX();
  }

  // addToCart(product: Product): void {
  //   this._CartService.addToCart(product).subscribe({
  //     next: () => {
  //       this._snackBar.open("Product added to cart", "", {
  //         duration: 2000,
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top'
  //       });
  //     }
  //   });
  // }
  addToCart(product: Product): void {
    this._CartService.addToCartX(product);
    this._snackBar.open("Product added to cart", "", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;

    searchTerm = searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter(
      x => x.name.toLowerCase().includes(searchTerm)
    )

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;

    if (this.sortOrder == "priceLowHigh") {
      this.filteredProducts.sort((a, b) => a.price - b.price)
    } else if (this.sortOrder == "priceHighLow") {
      this.filteredProducts.sort((a, b) => b.price - a.price)
    }

  }

}
