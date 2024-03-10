import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, retry, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  // public addToCart(title: string): void {
  //   // this.scrollTo(target);
  //   // this.formValues.productTitle = title;
  //   // this.cartService.count++;
  //   // this.products = this.products.filter(item => item.title.toUpperCase() !== title.toUpperCase());
  //
  //   //new logic
  //
  //   //с помощью сервира CartService
  //   // this.cartService.product-card = title;
  //   // this.router.navigate(['/order']);
  //
  //   //с помощью URL-параметров
  //   this.router.navigate(['/order'], {queryParams: {product-card: title}});
  // };
}
