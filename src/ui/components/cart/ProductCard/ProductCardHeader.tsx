import type { Product } from "@/domain/cart/value-objects/Product";
import { goldSilverCopperFormatter } from "@/domain/currency/GoldSilverCopperFormatter";
import { Badge } from "@/ui/primitives/badge";
import { CardHeader } from "@/ui/primitives/card";

interface ProductCardHeaderProps {
  product: Product;
}

export function ProductCardHeader({ product }: ProductCardHeaderProps) {
  const formattedPrice = goldSilverCopperFormatter.format(product.price);

  return (
    <CardHeader className="p-4 pb-0 lg:min-h-20">
      <div className="flex flex-col gap-2 min-h-[85px]">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 items-start">
          {product.name}
        </h3>
        <Badge variant="secondary">{formattedPrice}</Badge>
      </div>
    </CardHeader>
  );
}
