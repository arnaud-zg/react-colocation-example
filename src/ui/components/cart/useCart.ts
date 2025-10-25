import { Cart } from "@/domain/cart/Cart";
import type { Product } from "@/domain/cart/value-objects/Product";
import { useCallback, useState } from "react";

export function useCart(initialCart = new Cart()) {
  const [cart, setCart] = useState<Cart>(initialCart);

  const addItem = useCallback((product: Product) => {
    setCart((prev) => prev.addItem(product));
  }, []);

  const deleteItem = useCallback((product: Product) => {
    setCart((prev) => prev.deleteItem(product));
  }, []);

  const decrementItem = useCallback((product: Product) => {
    setCart((prev) => prev.decrementItem(product));
  }, []);

  const clearCart = useCallback(() => {
    setCart(new Cart());
  }, []);

  return {
    cart,
    addItem,
    deleteItem,
    decrementItem,
    clearCart,
  };
}
