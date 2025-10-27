import type {
  KnowledgeProfile,
  Product,
} from "@/domain/cart/value-objects/Product/Product";
import { Button } from "@/ui/primitives/button";
import { CardFooter } from "@/ui/primitives/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/ui/primitives/modal";
import { BookOpenText, Clapperboard, ShoppingCart } from "lucide-react";

interface ProductCardFooterProps {
  product: Product;
  profile: KnowledgeProfile;
  onAddToCart: (product: Product) => void;
}

export function ProductCardFooter({
  product,
  profile,
  onAddToCart,
}: ProductCardFooterProps) {
  const loreLink = product.getLoreLink(profile);
  const videoUrl = product.getVideoUrl(profile);

  return (
    <CardFooter className="p-4 pt-0 flex flex-col gap-2">
      <Button
        onClick={() => onAddToCart(product)}
        className="w-full flex items-center justify-center gap-2"
        variant="default"
      >
        <ShoppingCart className="h-4 w-4" /> Add to Cart
      </Button>

      <Modal>
        <ModalTrigger className="flex-1" asChild>
          <Button
            className="w-full flex items-center justify-center gap-2"
            variant="link"
          >
            <Clapperboard className="h-4 w-4" /> Watch Video
          </Button>
        </ModalTrigger>

        <ModalContent className="rounded-2xl shadow-lg">
          <ModalHeader>
            <ModalTitle className="text-center text-xl font-semibold">
              {product.displayName()}
            </ModalTitle>
            <ModalDescription className="mt-2 text-center text-base">
              <iframe
                className="w-full min-h-[315px]"
                src={`${videoUrl}?autoplay=1`}
                title={product.displayName()}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </ModalDescription>
          </ModalHeader>
        </ModalContent>
      </Modal>

      {profile !== "beginner" && (
        <Button
          onClick={() => {
            window.open(loreLink, "_blank");
          }}
          className="w-full flex items-center justify-center gap-2"
          variant="link"
        >
          <BookOpenText className="h-4 w-4" /> Read Lore
        </Button>
      )}
    </CardFooter>
  );
}
