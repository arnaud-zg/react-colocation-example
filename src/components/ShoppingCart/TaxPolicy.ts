import { Money } from "@/types/Money";

export class TaxPolicy {
  static RATE = 0.07; // 7%

  static calculate(subtotal: Money): Money {
    return new Money(subtotal.amount * TaxPolicy.RATE);
  }
}
