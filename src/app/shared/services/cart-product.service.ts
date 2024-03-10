import {Injectable} from '@angular/core';
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  count: number = 0;

  constructor( private cartService: CartService ) {
  }
}
