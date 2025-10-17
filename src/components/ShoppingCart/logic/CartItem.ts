import { Money } from "@/types/Money";
import type { Product } from "@/types/Product";
import { Quantity } from "@/types/Quantity";

export class CartItem {
  static MAX_QUANTITY = 10; // Maximum allowed per item
  static MIN_QUANTITY = 1; // Minimum allowed per item

  constructor(
    private _product: Product,
    private _quantity: Quantity
  ) {}

  get id() {
    return this._product.id;
  }

  get name() {
    return this._product.name;
  }

  get product(): Product {
    return this._product;
  }

  get quantity(): Quantity {
    return this._quantity;
  }

  get price(): Money {
    return new Money(this._product.price.amount);
  }

  get imageUrl() {
    return this._product.imageUrl;
  }

  increaseQuantity(): CartItem {
    if (this.quantity.value >= CartItem.MAX_QUANTITY) {
      return this; // already at max
    }
    return new CartItem(this._product, this.quantity.increment());
  }

  decreaseQuantity(): CartItem {
    if (this.quantity.value <= CartItem.MIN_QUANTITY) {
      return this; // already at min
    }
    return new CartItem(this._product, this.quantity.decrement());
  }

  updateQuantity(newQuantity: Quantity): CartItem {
    // Clamp quantity between min and max
    let value = newQuantity.value;
    if (value < CartItem.MIN_QUANTITY) value = CartItem.MIN_QUANTITY;
    if (value > CartItem.MAX_QUANTITY) value = CartItem.MAX_QUANTITY;

    return new CartItem(this._product, new Quantity(value));
  }

  totalPrice(): Money {
    return this.price.multiply(this.quantity.value);
  }
}
