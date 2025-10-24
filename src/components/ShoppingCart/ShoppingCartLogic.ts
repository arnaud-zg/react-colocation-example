import { Money } from "@/types/Money";
import { Quantity } from "@/types/Quantity";
import type { Product } from "../../types/Product";
import { CartItem } from "./logic/CartItem";

// Colocated business logic using static methods
export class ShoppingCartLogic {
  private items: CartItem[] = [];

  // Business rules as static properties
  static SHIPPING_THRESHOLD = new Money(50);
  static SHIPPING_COST = new Money(5.99);
  static TAX_RATE = 0.07; // 7%

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  get subtotal(): Money {
    return this.items.reduce(
      (total, item) => total.add(item.totalPrice()),
      new Money(0)
    );
  }

  get shipping(): Money {
    if (this.subtotal.amount >= ShoppingCartLogic.SHIPPING_THRESHOLD.amount) {
      return new Money(0);
    }
    return ShoppingCartLogic.SHIPPING_COST;
  }

  get tax(): Money {
    return this.subtotal.multiply(ShoppingCartLogic.TAX_RATE);
  }

  get total(): Money {
    return this.subtotal.add(this.tax).add(this.shipping);
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get totalItems(): Quantity {
    return this.items.reduce(
      (total, item) => total.add(item.quantity),
      new Quantity(0)
    );
  }

  get allItems(): readonly CartItem[] {
    return this.items;
  }

  /**
   * Add item to cart or increase quantity if already exists
   */
  addItem(product: Product): ShoppingCartLogic {
    const existing = this.items.find((item) => item.id === product.id);

    if (existing) {
      const updatedItem = existing.increaseQuantity();

      return new ShoppingCartLogic(
        this.items.map((item) => (item.id === existing.id ? updatedItem : item))
      );
    }

    const newItem = new CartItem(product, new Quantity(1));

    return new ShoppingCartLogic([...this.items, newItem]);
  }

  /**
   * Remove item from cart or decrease quantity
   */
  removeItem(productId: string): ShoppingCartLogic {
    const existing = this.items.find((item) => item.id === productId);

    if (!existing) {
      return this;
    }

    const updatedItem = existing.decreaseQuantity();
    const shouldRemove = updatedItem.quantity.value === 0;

    return new ShoppingCartLogic(
      shouldRemove
        ? this.items.filter((item) => item.id !== productId)
        : this.items.map((item) => (item.id === productId ? updatedItem : item))
    );
  }

  /**
   * Update item quantity directly
   */
  updateItemQuantity(productId: string, quantity: Quantity): ShoppingCartLogic {
    return new ShoppingCartLogic(
      this.items.map((item) =>
        item.id === productId ? item.updateQuantity(quantity) : item
      )
    );
  }
}
