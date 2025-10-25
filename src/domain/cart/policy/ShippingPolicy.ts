import { Money } from "@/domain/cart/value-objects/Money";

export class ShippingPolicy {
  static SHIPPING_THRESHOLD = new Money(50);
  static SHIPPING_COST = new Money(5.99);

  static calculate(subtotal: Money): Money {
    return subtotal.amount >= ShippingPolicy.SHIPPING_THRESHOLD.amount
      ? new Money(0)
      : ShippingPolicy.SHIPPING_COST;
  }
}
