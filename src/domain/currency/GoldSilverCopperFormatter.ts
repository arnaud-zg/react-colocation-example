import type { Money } from "@/domain/cart/value-objects/Money";

/**
 * Converts copper-based Money values into Azeroth-style currency
 * (Gold, Silver, Copper) and formats them for display.
 */
class GoldSilverCopperFormatter {
  convertCopper(copper: Money) {
    const safeCopper = Math.round(copper.amount);

    const gold = Math.floor(safeCopper / 10000);
    const remainderAfterGold = safeCopper - gold * 10000;

    const silver = Math.floor(remainderAfterGold / 100);
    const remainingCopper = remainderAfterGold - silver * 100;

    return { gold, silver, copper: remainingCopper };
  }

  format(amount: Money): string {
    const { gold, silver, copper } = this.convertCopper(amount);

    const formatted: string[] = [];

    if (gold > 0) formatted.push(`${gold} 🟡`);
    if (silver > 0 || gold > 0) formatted.push(`${silver} ⚪`);
    formatted.push(`${copper} 🟤`);

    return formatted.join(" ");
  }
}

export const goldSilverCopperFormatter = new GoldSilverCopperFormatter();
