export class Money {
  constructor(private _amount: number) {
    if (_amount < 0) {
      throw new Error("Money amount cannot be negative");
    }
  }

  add(other: Money): Money {
    return new Money(this._amount + other._amount);
  }

  subtract(other: Money): Money {
    const result = this._amount - other._amount;

    if (result < 0) {
      throw new Error("Resulting Money cannot be negative");
    }

    return new Money(result);
  }

  multiply(factor: number): Money {
    return new Money(this._amount * factor);
  }

  toAmount(): number {
    return this._amount;
  }
}
