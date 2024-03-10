import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {TitleComponent} from "../title/title.component";
import {CartProductService} from "../../services/cart-product.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less'],
  providers: [CartProductService]
})
export class ProductCardComponent {

  @Input() product: ProductType;

  // -> Getter / Setter с @Input <-
  // @Input()
  // get product-card(): ProductType { return this._product; }
  // set product-card(param: ProductType) {
  //   param.title = param.title.toUpperCase();
  //   this._product = param;
  // }

  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(TitleComponent)
  private titleComponent!: TitleComponent;

  @ViewChild('elem')
  private elem!: ElementRef;

  constructor( public cartProductService: CartProductService ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      dateTime: '',
    }
  }

  // public addProductToCart(): void {
  //   this.cartProductService.count++;
  //   this.addToCartEvent.emit(this.titleComponent.title);
  // }
}
