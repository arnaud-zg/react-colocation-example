import type { Product } from "../../types/Product";

// Define cart item type
export interface CartItem extends Product {
  quantity: number;
}

// Colocated business logic using static methods
export class ShoppingCartLogic {
  // Business rules as static properties
  static MAX_ITEM_QUANTITY = 10;
  static MIN_ITEM_QUANTITY = 1;
  static SHIPPING_THRESHOLD = 50;
  static SHIPPING_COST = 5.99;
  static TAX_RATE = 0.07; // 7%

  /**
   * Add item to cart or increase quantity if already exists
   */
  static addItemToCart(cart: CartItem[], product: Product): CartItem[] {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Item exists, increase quantity if under max
      return cart.map((item, index) => {
        if (
          index === existingItemIndex &&
          item.quantity < ShoppingCartLogic.MAX_ITEM_QUANTITY
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    }

    // New item
    return [...cart, { ...product, quantity: 1 }];
  }

  /**
   * Remove item from cart or decrease quantity
   */
  static removeItemFromCart(cart: CartItem[], productId: string): CartItem[] {
    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex >= 0) {
      const item = cart[existingItemIndex];

      if (item.quantity === 1) {
        // Remove item entirely if quantity becomes 0
        return cart.filter((item) => item.id !== productId);
      }

      // Decrease quantity
      return cart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    }

    return cart;
  }

  /**
   * Update item quantity directly
   */
  static updateItemQuantity(
    cart: CartItem[],
    productId: string,
    quantity: number
  ): CartItem[] {
    // Validate quantity within bounds
    const validQuantity = Math.max(
      ShoppingCartLogic.MIN_ITEM_QUANTITY,
      Math.min(quantity, ShoppingCartLogic.MAX_ITEM_QUANTITY)
    );

    return cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: validQuantity };
      }
      return item;
    });
  }

  /**
   * Calculate subtotal before tax and shipping
   */
  static calculateSubtotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /**
   * Calculate shipping cost based on subtotal
   */
  static calculateShipping(subtotal: number): number {
    return subtotal >= ShoppingCartLogic.SHIPPING_THRESHOLD
      ? 0
      : ShoppingCartLogic.SHIPPING_COST;
  }

  /**
   * Calculate tax amount
   */
  static calculateTax(subtotal: number): number {
    return subtotal * ShoppingCartLogic.TAX_RATE;
  }

  /**
   * Calculate order total including tax and shipping
   */
  static calculateTotal(cart: CartItem[]): {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  } {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    const subtotal = this.calculateSubtotal(cart);
    const shipping = ShoppingCartLogic.calculateShipping(subtotal);
    const tax = ShoppingCartLogic.calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  }

  static convertCopper(copper: number) {
    const safeCopper = Math.round(copper);

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
  static getFormattedPrices(amount: number): string {
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
  static getTotalItems(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
}
