import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "./ShoppingCartLogic";
import { ShoppingCartLogic } from "./ShoppingCartLogic";

interface CartItemProps {
  item: CartItemType;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartItem({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{
        opacity: 0,
        height: 0,
        overflow: "hidden",
        marginBottom: 0,
      }}
      transition={{
        type: "tween",
        ease: [0.4, 0.0, 0.2, 1], // Elegant ease-in-out
        opacity: { duration: 0.3 },
        height: { duration: 0.5 },
        layout: { duration: 0.5 },
      }}
    >
      <Card className="mb-3 overflow-hidden border-0 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="absolute h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <div className="mt-0.5 flex items-center">
                <span className="text-xs text-gray-500">
                  {ShoppingCartLogic.getFormattedPrices(item.price)} each
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center">
              <div className="text-right font-medium mr-2 whitespace-nowrap">
                {ShoppingCartLogic.getFormattedPrices(
                  item.price * item.quantity
                )}
              </div>
              <Button
                onClick={() => onRemoveItem(item.id)}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center border rounded-md">
              <Button
                onClick={() => onDecreaseQuantity(item.id)}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-r-none p-0"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <Separator orientation="vertical" />

              <span className="px-3 py-0.5 text-center min-w-[30px] text-sm">
                {item.quantity}
              </span>

              <Separator orientation="vertical" />

              <Button
                onClick={() => onIncreaseQuantity(item.id)}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-l-none p-0"
                aria-label="Increase quantity"
                disabled={item.quantity >= ShoppingCartLogic.MAX_ITEM_QUANTITY}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
