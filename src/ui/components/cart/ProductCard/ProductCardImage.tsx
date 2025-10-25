import type { Product } from "@/domain/cart/value-objects/Product";

interface ProductCardImageProps {
  product: Product;
}

export const ProductCardImage = ({ product }: ProductCardImageProps) => {
  return (
    <div className="aspect-[4/3] relative overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="object-cover w-full h-full transition-transform hover:scale-105"
      />
    </div>
  );
};
