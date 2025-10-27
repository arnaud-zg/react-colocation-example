import { describe, expect, it } from "vitest";
import { Money } from "../Money";

describe("Money", () => {
  it("should create a Money instance with a positive amount", () => {
    const initialMoney = new Money(100);
    expect(initialMoney.toAmount()).toBe(100);
  });

  it("should throw an error if initialized with a negative amount", () => {
    expect(() => new Money(-50)).toThrowError(
      "Money amount cannot be negative"
    );
  });

  it("should add two Money instances correctly", () => {
    const firstMoney = new Money(50);
    const secondMoney = new Money(30);
    const totalMoney = firstMoney.add(secondMoney);

    expect(totalMoney.toAmount()).toBe(80);
  });

  it("should subtract two Money instances correctly", () => {
    const availableMoney = new Money(100);
    const spentMoney = new Money(40);
    const remainingMoney = availableMoney.subtract(spentMoney);

    expect(remainingMoney.toAmount()).toBe(60);
  });

  it("should throw an error if subtraction results in a negative amount", () => {
    const smallMoney = new Money(30);
    const largeMoney = new Money(50);

    expect(() => smallMoney.subtract(largeMoney)).toThrowError(
      "Resulting Money cannot be negative"
    );
  });

  it("should multiply the money amount correctly", () => {
    const baseMoney = new Money(25);
    const multipliedMoney = baseMoney.multiply(3);

    expect(multipliedMoney.toAmount()).toBe(75);
  });

  it("should be immutable (operations return a new instance)", () => {
    const originalMoney = new Money(60);
    const addedMoney = originalMoney.add(new Money(40));
    const subtractedMoney = originalMoney.subtract(new Money(20));
    const multipliedMoney = originalMoney.multiply(2);

    expect(addedMoney).not.toBe(originalMoney);
    expect(subtractedMoney).not.toBe(originalMoney);
    expect(multipliedMoney).not.toBe(originalMoney);

    expect(originalMoney.toAmount()).toBe(60);
    expect(addedMoney.toAmount()).toBe(100);
    expect(subtractedMoney.toAmount()).toBe(40);
    expect(multipliedMoney.toAmount()).toBe(120);
  });

  it("should support chained operations", () => {
    const startingMoney = new Money(50);
    const resultMoney = startingMoney
      .add(new Money(25))
      .subtract(new Money(30))
      .multiply(2);

    // Calculation: ((50 + 25) - 30) * 2 = (75 - 30) * 2 = 45 * 2 = 90
    expect(resultMoney.toAmount()).toBe(90);
  });
});
