import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { BookOpenText, Clapperboard, ShoppingCart } from "lucide-react";
import type { KnowledgeProfile, Product } from "../../types/Product";
import { ShoppingCartLogic } from "./ShoppingCartLogic";

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
  const details = product.knowledge[profile];
  const formattedPrices = ShoppingCartLogic.getFormattedPrices(product.price);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg gap-1">
      {/* Product Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>

      {/* Header: Name + Price + Profile */}
      <CardHeader className="p-4 pb-0 lg:min-h-20">
        <div className="flex flex-col gap-2 min-h-[85px]">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 items-start">
            {product.name}
          </h3>
          <Badge variant="secondary">{formattedPrices}</Badge>
        </div>
      </CardHeader>

      {/* Content: Description + Stats + Effects */}
      <CardContent className="p-4 pt-2 flex flex-col">
        <p className="text-sm text-gray-600 mb-3">📜 {details.description}</p>

        {profile !== "beginning" && (
          <div className="flex flex-col gap-1 mb-2">
            <h4 className="font-semibold flex items-center gap-1">📊 Stats:</h4>
            <ul className="text-sm list-disc list-inside">
              {Object.entries(details.stats).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}{" "}
                  {key === "power" ? "⚔️" : key === "durability" ? "🛡️" : "🔮"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <h4 className="font-semibold flex items-center">✨ Effects:</h4>
          <ul className="text-sm list-disc list-inside">
            {details.effects.map((effect, idx) => (
              <li key={idx}>💠 {effect}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      {/* Footer: Add to Cart + Extra Resources */}
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
    </Card>
  );
}
