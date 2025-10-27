import type { Product } from "@/domain/cart/value-objects/Product/Product";

interface ProductCardImageProps {
  product: Product;
}

export const ProductCardImage = ({ product }: ProductCardImageProps) => {
  return (
    <div className="aspect-[4/3] relative overflow-hidden">
      <img
        src={product.displayImage()}
        alt={product.displayName()}
        className="object-cover w-full h-full transition-transform hover:scale-105"
      />
    </div>
  );
};
