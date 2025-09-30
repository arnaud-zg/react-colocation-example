import { CardContent } from "@/components/ui/card";
import type { KnowledgeProfile, Product } from "../../../types/Product";

interface ProductCardContentProps {
  product: Product;
  profile: KnowledgeProfile;
}

export function ProductCardContent({
  product,
  profile,
}: ProductCardContentProps) {
  const details = product.knowledge[profile];

  return (
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
            <li key={`${idx}-${effect}`}>💠 {effect}</li>
          ))}
        </ul>
      </div>
    </CardContent>
  );
}
