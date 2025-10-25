import { Money } from "@/domain/cart/value-objects/Money";

export class TaxPolicy {
  static RATE = 0.07; // 7%

  static calculate(subtotal: Money): Money {
    return new Money(subtotal.amount * TaxPolicy.RATE);
  }
}
