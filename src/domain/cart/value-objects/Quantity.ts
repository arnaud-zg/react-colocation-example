export class Quantity {
  constructor(private _value: number) {
    if (_value < 0) {
      throw new Error("Quantity cannot be negative");
    }
  }

  get value(): number {
    return this._value;
  }

  add(other: Quantity): Quantity {
    return new Quantity(this._value + other._value);
  }

  increment(): Quantity {
    return new Quantity(this._value + 1);
  }

  decrement(): Quantity {
    if (this._value === 0) {
      throw new Error("Quantity cannot be less than 0");
    }
    return new Quantity(this._value - 1);
  }
}
