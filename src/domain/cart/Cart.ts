import { Money } from "@/domain/cart/value-objects/Money";
import type { Product } from "@/domain/cart/value-objects/Product";
import { Quantity } from "@/domain/cart/value-objects/Quantity";
import { CartItem } from "./CartItem";
import { ShippingPolicy } from "./policy/ShippingPolicy";
import { TaxPolicy } from "./policy/TaxPolicy";

/**
 * Immutable shopping cart that encapsulates its behavior and state.
 */
export class Cart {
  private items: CartItem[] = [];

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  totalItems(): Quantity {
    return this.items.reduce(
      (total, item) => total.add(item.quantity),
      new Quantity(0)
    );
  }

  calculateSubtotal(): Money {
    return this.items.reduce(
      (total, item) => total.add(item.totalPrice()),
      new Money(0)
    );
  }

  calculateShipping(): Money {
    return ShippingPolicy.calculate(this.calculateSubtotal());
  }

  calculateTax(): Money {
    return TaxPolicy.calculate(this.calculateSubtotal());
  }

  calculateTotal(): Money {
    const subtotal = this.calculateSubtotal();
    const tax = TaxPolicy.calculate(subtotal);
    const shipping = ShippingPolicy.calculate(subtotal);
    return subtotal.add(tax).add(shipping);
  }

  getItemsCopy(): readonly CartItem[] {
    return [...this.items];
  }

  addItem(product: Product): Cart {
    const existing = this.items.find((item) => item.id === product.id);

    if (existing) {
      const updatedItem = existing.increaseQuantity();
      return new Cart(
        this.items.map((item) => (item.id === existing.id ? updatedItem : item))
      );
    }

    const newItem = new CartItem(product, new Quantity(1));
    return new Cart([...this.items, newItem]);
  }

  decrementItem(product: Product): Cart {
    const existing = this.items.find((item) => item.id === product.id);

    if (!existing) return this;

    const updatedItem = existing.decreaseQuantity();

    return new Cart(
      this.items.map((item) => (item.id === existing.id ? updatedItem : item))
    );
  }

  deleteItem(product: Product): Cart {
    const existing = this.items.find((item) => item.id === product.id);

    if (!existing) return this;

    return new Cart(this.items.filter((item) => item.id !== product.id));
  }
}
