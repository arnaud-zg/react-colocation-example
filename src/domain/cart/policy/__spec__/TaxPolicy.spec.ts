import { Money } from "@/domain/cart/value-objects/Money";
import { describe, expect, it } from "vitest";
import { TaxPolicy } from "../TaxPolicy";

describe("TaxPolicy", () => {
  it("should calculate 7% tax correctly for a subtotal", () => {
    const subtotal = new Money(100);
    const tax = TaxPolicy.calculate(subtotal);

    expect(tax.toAmount()).toBeCloseTo(7); // 100 * 0.07
  });

  it("should calculate tax correctly for a small subtotal", () => {
    const subtotal = new Money(10);
    const tax = TaxPolicy.calculate(subtotal);

    expect(tax.toAmount()).toBeCloseTo(0.7); // 10 * 0.07
  });

  it("should calculate zero tax for zero subtotal", () => {
    const subtotal = new Money(0);
    const tax = TaxPolicy.calculate(subtotal);

    expect(tax.toAmount()).toBe(0);
  });

  it("should calculate tax correctly for decimal subtotal", () => {
    const subtotal = new Money(123.45);
    const tax = TaxPolicy.calculate(subtotal);

    expect(tax.toAmount()).toBeCloseTo(8.6415); // 123.45 * 0.07
  });
});
