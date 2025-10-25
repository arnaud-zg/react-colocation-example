import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  ShoppingCart as ShoppingCartIcon,
  X,
} from "lucide-react";

import { PRODUCTS } from "@/data/products";
import { ShippingPolicy } from "@/domain/cart/policy/ShippingPolicy";
import { Money } from "@/domain/cart/value-objects/Money";
import { goldSilverCopperFormatter } from "@/domain/currency/GoldSilverCopperFormatter";
import { ShoppingCartItem } from "@/ui/components/Cart/ShoppingCartItem";
import { useCart } from "@/ui/components/Cart/useCart";
import { WelcomeModal } from "@/ui/components/WelcomeModal/WelcomeModal";
import { WelcomeModalLogic } from "@/ui/components/WelcomeModal/WelcomeModal.logic";
import type { WelcomeModalHandle } from "@/ui/components/WelcomeModal/WelcomeModal.types";
import { Badge } from "@/ui/primitives/badge";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/primitives/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/ui/primitives/modal";
import { Separator } from "@/ui/primitives/separator";
import { type FC, type RefObject, useState } from "react";
import { ProductCard } from "./ProductCard/ProductCard";
import { ProductCardLogic } from "./ProductCard/ProductCard.logic";

interface ShoppingCartProps {
  welcomeModalHandle: RefObject<WelcomeModalHandle>;
}

export const ShoppingCart: FC<ShoppingCartProps> = ({ welcomeModalHandle }) => {
  const [showCart, setShowCart] = useState(false);
  const { addItem, cart, decrementItem, deleteItem } = useCart();
  const { welcomeModalSurvey } = WelcomeModal.useWelcomeModalSurvey();

  const { subtotal, shipping, tax, total } = cart;
  const totalItems = cart.totalItems;
  const selectedProfile = ProductCardLogic.selectProfile(
    welcomeModalSurvey?.skill ?? "beginner"
  );

  return (
    <div className="container">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Azeroth's Finest Wares
        </h1>
        <Button
          size="default"
          onClick={() => welcomeModalHandle.current.open()}
        >
          {WelcomeModalLogic.selectSkillLabels(
            welcomeModalSurvey?.skill ?? "beginner"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6 gap-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Mystical Inventory
            </h2>

            <Button
              onClick={() => {
                setShowCart(true);
                const element = document.querySelector("#cart");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="lg:hidden relative"
              variant="outline"
            >
              <ShoppingCartIcon className="h-4 w-4 mr-2" />
              Cart <Badge className="ml-2">{totalItems.value}</Badge>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
                profile={selectedProfile}
              />
            ))}
          </div>
        </div>

        {/* Cart */}
        <div
          className={`lg:col-span-1 mt-14 ${showCart ? "block" : "hidden lg:block"}`}
          id="cart"
        >
          <Card className="bg-card border-0 shadow-sm sticky top-10">
            <CardHeader className="pb-0 pt-4 px-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-card-foreground">
                  Your Inventory
                </h2>
                <div className="flex justify-center">
                  <Badge variant="outline" className="font-normal">
                    {totalItems.value} items
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCart(false)}
                    className="rounded-full lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 px-4">
              {cart.isEmpty ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.4, 0.0, 0.2, 1],
                    }}
                  >
                    <ShoppingCartIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  </motion.div>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.9, ease: [0.4, 0.0, 0.2, 1] }}
                  >
                    Your inventory is empty
                  </motion.p>
                </motion.div>
              ) : (
                <>
                  <div className="relative">
                    <AnimatePresence initial={false}>
                      <motion.div
                        className="space-y-3"
                        layout="size"
                        key="cart-items-container"
                        transition={{
                          layout: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                          height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                        }}
                      >
                        {cart.allItems.map((item) => (
                          <ShoppingCartItem
                            key={item.id}
                            item={item}
                            onIncreaseQuantity={() => addItem(item.product)}
                            onDecreaseQuantity={() =>
                              decrementItem(item.product)
                            }
                            onRemoveItem={() => deleteItem(item.product)}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <Separator className="my-4" />

                  <motion.div
                    className="space-y-2"
                    layout={false}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0.0, 0.2, 1],
                    }}
                  >
                    <motion.div
                      className="flex justify-between items-center"
                      layout={false}
                      key="subtotal"
                    >
                      <span className="text-muted-foreground text-sm">
                        Subtotal:
                      </span>
                      <div className="relative h-6 flex items-center justify-end min-w-[80px] whitespace-nowrap">
                        <motion.span
                          className="font-medium absolute right-0 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1],
                          }}
                        >
                          {goldSilverCopperFormatter.format(subtotal)}
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-between items-center"
                      layout={false}
                      key="shipping"
                    >
                      <span className="text-muted-foreground text-sm">
                        Shipping:
                      </span>
                      <div className="relative h-6 flex items-center justify-end min-w-[80px]">
                        <motion.span
                          className="absolute right-0 flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1],
                          }}
                        >
                          {shipping.amount === 0 ? (
                            <Badge
                              variant="outline"
                              className="text-green-600 bg-green-50 text-xs py-0 h-5"
                            >
                              Free
                            </Badge>
                          ) : (
                            <span className="font-medium text-sm whitespace-nowrap">
                              {goldSilverCopperFormatter.format(shipping)}
                            </span>
                          )}
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-between items-center"
                      layout={false}
                      key="tax"
                    >
                      <span className="text-muted-foreground text-sm">
                        Tax:
                      </span>
                      <div className="relative h-6 flex items-center justify-end min-w-[80px] whitespace-nowrap">
                        <motion.span
                          className="font-medium absolute right-0 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1],
                          }}
                        >
                          {goldSilverCopperFormatter.format(tax)}
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>

                  <Separator className="my-3" />

                  <motion.div
                    className="flex justify-between items-center py-1"
                    layout={false}
                    key="total"
                  >
                    <span className="font-semibold">Total:</span>
                    <div className="flex-1 relative h-6 flex items-center justify-end">
                      <motion.span
                        className="font-bold absolute right-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                      >
                        {goldSilverCopperFormatter.format(total)}
                      </motion.span>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {subtotal.amount <
                      ShippingPolicy.SHIPPING_THRESHOLD.amount && (
                      <motion.div
                        className="bg-gray-50 border border-gray-200 rounded-md p-2 text-xs text-gray-700 mt-3"
                        initial={{
                          opacity: 0,
                          height: 0,
                          padding: 0,
                          margin: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          padding: "0.5rem",
                          marginTop: "0.75rem",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          padding: 0,
                          margin: 0,
                          overflow: "hidden",
                        }}
                        transition={{
                          duration: 0.5,
                          opacity: { duration: 0.4 },
                          height: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
                        }}
                        key="shipping-notification"
                        layout
                      >
                        <motion.span
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          Add{" "}
                          {goldSilverCopperFormatter.format(
                            new Money(
                              ShippingPolicy.SHIPPING_THRESHOLD.amount
                            ).subtract(subtotal)
                          )}{" "}
                          more to earn free delivery by griffin!
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </CardContent>

            <CardFooter className="pt-2 pb-4 px-4">
              <Modal>
                <ModalTrigger className="flex-1" asChild>
                  <Button
                    disabled={cart.isEmpty}
                    className="w-full"
                    size="default"
                  >
                    Complete Purchase
                  </Button>
                </ModalTrigger>

                <ModalContent className="rounded-2xl shadow-lg">
                  <ModalHeader>
                    <ModalTitle className="text-center text-xl font-semibold">
                      🎉 End of the Demo
                    </ModalTitle>
                    <ModalDescription className="mt-2 text-center text-base">
                      Thanks for checking this out! Feel free to reach out if
                      you'd like to <b>discuss</b> or <b>collaborate</b> with
                      me.
                    </ModalDescription>
                  </ModalHeader>

                  <div className="mt-4 flex justify-center gap-2">
                    {/* GitHub icon button */}
                    <Button asChild size="icon" variant="outline">
                      <a
                        href="https://github.com/arnaud-zg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>

                    {/* LinkedIn icon button */}
                    <Button asChild size="icon" variant="outline">
                      <a
                        href="https://www.linkedin.com/in/arnaudzheng/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </ModalContent>
              </Modal>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
