import { Money } from "@/domain/cart/value-objects/Money";
import type { Product } from "@/domain/cart/value-objects/Product";
import { Quantity } from "@/domain/cart/value-objects/Quantity";
import { CartItem } from "./CartItem";
import { ShippingPolicy } from "./policy/ShippingPolicy";
import { TaxPolicy } from "./policy/TaxPolicy";

/**
 * Represents a shopping cart containing multiple items.
 * Encapsulates business logic for subtotal, shipping, tax, and total calculation.
 * Methods follow an immutable pattern: each modification returns a **new Cart instance**.
 */
export class Cart {
  private items: CartItem[] = [];

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  /** Total cost of all items before tax and shipping */
  get subtotal(): Money {
    return this.items.reduce(
      (total, item) => total.add(item.totalPrice()),
      new Money(0)
    );
  }

  /** Shipping cost calculated according to the ShippingPolicy */
  get shipping(): Money {
    return ShippingPolicy.calculate(this.subtotal);
  }

  /** Tax amount calculated according to the TaxPolicy */
  get tax(): Money {
    return TaxPolicy.calculate(this.subtotal);
  }

  /** Total amount including subtotal, tax, and shipping */
  get total(): Money {
    return this.subtotal.add(this.tax).add(this.shipping);
  }

  /** Returns true if the cart has no items */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Total quantity of all items in the cart */
  get totalItems(): Quantity {
    return this.items.reduce(
      (total, item) => total.add(item.quantity),
      new Quantity(0)
    );
  }

  /** Returns all items currently in the cart (read-only) */
  get allItems(): readonly CartItem[] {
    return this.items;
  }

  /**
   * Adds a product to the cart.
   * If the product already exists, increases its quantity by 1.
   * Returns a new Cart instance with the updated items.
   */
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

  /**
   * Decreases the quantity of the given product by 1.
   * If quantity reaches zero, the item is **removed** automatically.
   * Returns a new Cart instance with the updated items.
   */
  decrementItem(product: Product): Cart {
    const existing = this.items.find((item) => item.id === product.id);

    if (!existing) return this;

    const updatedItem = existing.decreaseQuantity();

    return new Cart(
      this.items.map((item) => (item.id === existing.id ? updatedItem : item))
    );
  }

  /**
   * Removes all instances of a product from the cart.
   * This is equivalent to deleting the item entirely.
   * Returns a new Cart instance with the remaining items.
   */
  deleteItem(product: Product): Cart {
    const existing = this.items.find((item) => item.id === product.id);

    if (!existing) return this;

    return new Cart(this.items.filter((item) => item.id !== product.id));
  }
}
