import { Money } from "@/domain/cart/value-objects/Money";
import { describe, expect, it } from "vitest";
import { ShippingPolicy } from "../ShippingPolicy";

describe("ShippingPolicy", () => {
  it("should return 0 shipping if subtotal is equal to or above the threshold", () => {
    const subtotalAtThreshold = new Money(50);
    const subtotalAboveThreshold = new Money(100);

    expect(ShippingPolicy.calculate(subtotalAtThreshold).toAmount()).toBe(0);
    expect(ShippingPolicy.calculate(subtotalAboveThreshold).toAmount()).toBe(0);
  });

  it("should return the shipping cost if subtotal is below the threshold", () => {
    const subtotalBelowThreshold = new Money(25);
    const shippingCost = ShippingPolicy.calculate(subtotalBelowThreshold);

    expect(shippingCost.toAmount()).toBe(5.99);
  });

  it("should correctly handle edge case just below threshold", () => {
    const subtotalJustBelow = new Money(49.99);
    const shippingCost = ShippingPolicy.calculate(subtotalJustBelow);
    expect(shippingCost.toAmount()).toBe(5.99);
  });

  it("should correctly handle edge case just above threshold", () => {
    const subtotalJustAbove = new Money(50.01);
    const shippingCost = ShippingPolicy.calculate(subtotalJustAbove);
    expect(shippingCost.toAmount()).toBe(0);
  });
});
