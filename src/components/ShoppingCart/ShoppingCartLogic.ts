import { Money } from "@/types/Money";
import { Quantity } from "@/types/Quantity";
import type { Product } from "../../types/Product";
import { CartItem } from "./logic/CartItem";

// Colocated business logic using static methods
export class ShoppingCartLogic {
  // Business rules as static properties
  static SHIPPING_THRESHOLD = 50;
  static SHIPPING_COST = 5.99;
  static TAX_RATE = 0.07; // 7%

  /**
   * Add item to cart or increase quantity if already exists
   */
  static addItemToCart(cart: CartItem[], product: Product): CartItem[] {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex < 0) {
      return [...cart, new CartItem(product, new Quantity(1))];
    }

    return cart.map((item, index) => {
      if (index === existingItemIndex) {
        return item.increaseQuantity();
      }

      return item;
    });
  }

  /**
   * Remove item from cart or decrease quantity
   */
  static removeItemFromCart(cart: CartItem[], productId: string): CartItem[] {
    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex < 0) {
      return cart;
    }

    return cart.map((item, index) => {
      if (index === existingItemIndex) {
        return item.decreaseQuantity();
      }

      return item;
    });
  }

  /**
   * Update item quantity directly
   */
  static updateItemQuantity(
    cart: CartItem[],
    productId: string,
    quantity: Quantity
  ): CartItem[] {
    return cart.map((item) => {
      if (item.id === productId) {
        return item.updateQuantity(quantity);
      }
      return item;
    });
  }

  /**
   * Calculate subtotal before tax and shipping
   */
  static calculateSubtotal(cart: CartItem[]): Money {
    return cart.reduce(
      (total, item) => total.add(item.totalPrice()),
      new Money(0)
    );
  }

  /**
   * Calculate shipping cost based on subtotal
   */
  static calculateShipping(subtotal: Money): Money {
    return subtotal.amount >= ShoppingCartLogic.SHIPPING_THRESHOLD
      ? new Money(0)
      : new Money(ShoppingCartLogic.SHIPPING_COST);
  }

  /**
   * Calculate tax amount
   */
  static calculateTax(subtotal: Money): Money {
    return subtotal.multiply(ShoppingCartLogic.TAX_RATE);
  }

  /**
   * Calculate order total including tax and shipping
   */
  static calculateTotal(cart: CartItem[]): {
    subtotal: Money;
    shipping: Money;
    tax: Money;
    total: Money;
  } {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    const subtotal = this.calculateSubtotal(cart);
    const shipping = ShoppingCartLogic.calculateShipping(subtotal);
    const tax = ShoppingCartLogic.calculateTax(subtotal);
    const total = subtotal.add(shipping).add(tax);

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  }

  static convertCopper(copper: Money) {
    const safeCopper = Math.round(copper.amount);

    const gold = Math.floor(safeCopper / 10000);
    const remainderAfterGold = safeCopper - gold * 10000;

    const silver = Math.floor(remainderAfterGold / 100);
    const remainingCopper = remainderAfterGold - silver * 100;

    return {
      gold,
      silver,
      copper: remainingCopper,
    };
  }
  /**
   * Format currency for display
   */
  static getFormattedPrices(amount: Money): string {
    const { gold, silver, copper } = ShoppingCartLogic.convertCopper(amount);

    const formattedPrices = [];

    if (gold > 0) {
      formattedPrices.push(`${gold} 🟡`);
    }

    if (silver > 0 || gold > 0) {
      formattedPrices.push(`${silver} ⚪`);
    }

    formattedPrices.push(`${copper} 🟤`);

    return formattedPrices.join(" ");
  }

  /**
   * Check if cart is empty
   */
  static isCartEmpty(cart: CartItem[]): boolean {
    return cart.length === 0;
  }

  /**
   * Get total number of items in cart (considering quantities)
   */
  static getTotalItems(cart: CartItem[]): Quantity {
    return cart.reduce(
      (total, item) => total.add(item.quantity),
      new Quantity(0)
    );
  }
}
