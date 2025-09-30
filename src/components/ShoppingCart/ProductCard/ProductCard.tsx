import { Card } from "@/components/ui/card";
import type { KnowledgeProfile, Product } from "../../../types/Product";
import { ProductCardContent } from "./ProductCardContent";
import { ProductCardFooter } from "./ProductCardFooter";
import { ProductCardHeader } from "./ProductCardHeader";
import { ProductCardImage } from "./ProductCardImage";

interface ProductCardProps {
  product: Product;
  profile: KnowledgeProfile;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({
  product,
  profile,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg gap-1">
      <ProductCardImage product={product} />
      <ProductCardHeader product={product} />
      <ProductCardContent product={product} profile={profile} />
      <ProductCardFooter
        product={product}
        profile={profile}
        onAddToCart={onAddToCart}
      />
    </Card>
  );
}
