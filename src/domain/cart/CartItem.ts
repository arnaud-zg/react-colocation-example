import { Money } from "@/domain/cart/value-objects/Money";
import type { Product } from "@/domain/cart/value-objects/Product/Product";
import { Quantity } from "@/domain/cart/value-objects/Quantity";

export class CartItem {
  static MAX_QUANTITY = 10;
  static MIN_QUANTITY = 1;

  constructor(
    private readonly product: Product,
    private readonly quantity: Quantity
  ) {}

  increaseQuantity(): CartItem {
    const currentValue = this.quantity.toValue();

    if (currentValue >= CartItem.MAX_QUANTITY) {
      return this;
    }

    const newQuantity = this.quantity.increment();
    return new CartItem(this.product, newQuantity);
  }

  decreaseQuantity(): CartItem {
    const currentValue = this.quantity.toValue();

    if (currentValue <= CartItem.MIN_QUANTITY) {
      return this;
    }

    const newQuantity = this.quantity.decrement();
    return new CartItem(this.product, newQuantity);
  }

  updateQuantity(newQuantity: Quantity): CartItem {
    let value = newQuantity.toValue();

    if (value < CartItem.MIN_QUANTITY) {
      value = CartItem.MIN_QUANTITY;
    }

    if (value > CartItem.MAX_QUANTITY) {
      value = CartItem.MAX_QUANTITY;
    }

    const clampedQuantity = new Quantity(value);
    return new CartItem(this.product, clampedQuantity);
  }

  totalPrice(): Money {
    const pricePerUnit = new Money(this.product.displayPrice().toAmount());
    return pricePerUnit.multiply(this.quantity.toValue());
  }

  getId(): string {
    return this.product.displayId();
  }

  getName(): string {
    return this.product.displayName();
  }

  getImage(): string {
    return this.product.displayImage();
  }

  getQuantity(): Quantity {
    return this.quantity;
  }

  getPrice(): Money {
    return this.product.displayPrice();
  }

  getProduct(): Product {
    return this.product;
  }
}
