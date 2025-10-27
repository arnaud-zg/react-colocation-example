import { describe, expect, it } from "vitest";
import { Quantity } from "../Quantity";

describe("Quantity", () => {
  it("should create a Quantity with a positive value", () => {
    const initialQuantity = new Quantity(5);
    expect(initialQuantity.toValue()).toBe(5);
  });

  it("should throw an error if initialized with a negative value", () => {
    expect(() => new Quantity(-1)).toThrowError("Quantity cannot be negative");
  });

  it("should add two Quantities correctly", () => {
    const firstQuantity = new Quantity(3);
    const secondQuantity = new Quantity(7);
    const totalQuantity = firstQuantity.add(secondQuantity);

    expect(totalQuantity.toValue()).toBe(10);
  });

  it("should increment the quantity by 1", () => {
    const originalQuantity = new Quantity(2);
    const incrementedQuantity = originalQuantity.increment();

    expect(incrementedQuantity.toValue()).toBe(3);
  });

  it("should decrement the quantity by 1", () => {
    const originalQuantity = new Quantity(5);
    const decrementedQuantity = originalQuantity.decrement();

    expect(decrementedQuantity.toValue()).toBe(4);
  });

  it("should throw an error when trying to decrement 0", () => {
    const zeroQuantity = new Quantity(0);
    expect(() => zeroQuantity.decrement()).toThrowError(
      "Quantity cannot be less than 0"
    );
  });

  it("should be immutable (methods return a new instance)", () => {
    const baseQuantity = new Quantity(3);
    const incrementedQuantity = baseQuantity.increment();

    expect(incrementedQuantity).not.toBe(baseQuantity);
    expect(baseQuantity.toValue()).toBe(3);
    expect(incrementedQuantity.toValue()).toBe(4);
  });
});
