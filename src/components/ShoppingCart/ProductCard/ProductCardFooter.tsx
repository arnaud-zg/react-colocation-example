import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { BookOpenText, Clapperboard, ShoppingCart } from "lucide-react";
import type { KnowledgeProfile, Product } from "../../../types/Product";

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
  const details = product.knowledge[profile];

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
              {product.name}
            </ModalTitle>
            <ModalDescription className="mt-2 text-center text-base">
              <iframe
                className="w-full min-h-[315px]"
                src={`${details.extraResources.videoUrl}?autoplay=1`}
                title={product.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </ModalDescription>
          </ModalHeader>
        </ModalContent>
      </Modal>

      {profile !== "beginning" && (
        <Button
          onClick={() => {
            window.open(details.extraResources.loreLink, "_blank");
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
