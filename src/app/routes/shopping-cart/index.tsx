import { ShoppingCart } from "@/ui/components/Cart/ShoppingCart";
import { WelcomeModal } from "@/ui/components/WelcomeModal/WelcomeModal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shopping-cart/")({
  component: ShoppingCartRoute,
});

function ShoppingCartRoute() {
  const { ref } = WelcomeModal.useWelcomeModalHandle();

  return (
    <div className="relative min-h-screen bg-gray-50 py-8 px-4 justify-items-center">
      <ShoppingCart welcomeModalHandle={ref} />
      <WelcomeModal
        title="Choose Your Knowledge Level"
        description="Tell us how familiar you are with Azeroth's Finest Wares. This helps us customize the Mystical Inventory to match your experience."
        ref={ref}
      />
    </div>
  );
}
