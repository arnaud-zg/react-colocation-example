import type { Product } from "@/types/Product";
import type { Quantity } from "@/types/Quantity";
import { useCallback, useState } from "react";
import { ShoppingCartLogic } from "./ShoppingCartLogic";

export function useCart(initialCart = new ShoppingCartLogic()) {
  const [cart, setCart] = useState<ShoppingCartLogic>(initialCart);

  const addItem = useCallback((product: Product) => {
    setCart((prev) => prev.addItem(product));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => prev.removeItem(productId));
  }, []);

  const updateItemQuantity = useCallback(
    (productId: string, quantity: Quantity) => {
      setCart((prev) => prev.updateItemQuantity(productId, quantity));
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart(new ShoppingCartLogic());
  }, []);

  return {
    cart,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
  };
}
