import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import type { Product } from "../../../types/Product";
import { ShoppingCartLogic } from "../ShoppingCartLogic";

interface ProductCardHeaderProps {
  product: Product;
}

export function ProductCardHeader({ product }: ProductCardHeaderProps) {
  const formattedPrices = ShoppingCartLogic.getFormattedPrices(product.price);

  return (
    <CardHeader className="p-4 pb-0 lg:min-h-20">
      <div className="flex flex-col gap-2 min-h-[85px]">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 items-start">
          {product.name}
        </h3>
        <Badge variant="secondary">{formattedPrices}</Badge>
      </div>
    </CardHeader>
  );
}
