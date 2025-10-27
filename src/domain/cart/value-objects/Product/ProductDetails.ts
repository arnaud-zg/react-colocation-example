export class Effect {
  constructor(private readonly _value: string) {}

  toValue(): string {
    return this._value;
  }
}

export class Stats {
  constructor(
    private readonly _power: number,
    private readonly _durability: number,
    private readonly _manaBoost: number
  ) {
    if (_power < 0 || _durability < 0 || _manaBoost < 0) {
      throw new Error("Stats cannot be negative");
    }
  }

  increasePower(amount: number): Stats {
    return new Stats(this._power + amount, this._durability, this._manaBoost);
  }

  asObject(): Record<"power" | "durability" | "manaBoost", number> {
    return {
      power: this._power,
      durability: this._durability,
      manaBoost: this._manaBoost,
    };
  }
}

export class ExtraResources {
  constructor(
    private readonly _loreLink: string,
    private readonly _videoUrl: string
  ) {}

  getLoreLink(): string {
    return this._loreLink;
  }

  getVideoUrl(): string {
    return this._videoUrl;
  }
}

export class ProfileDetails {
  constructor(
    private readonly _description: string,
    private readonly _stats: Stats,
    private readonly _effects: Effect[],
    private readonly _extraResources: ExtraResources
  ) {}

  describe(): string {
    return this._description;
  }

  getStats(): Record<"power" | "durability" | "manaBoost", number> {
    return this._stats.asObject();
  }

  listEffects(): string[] {
    return this._effects.map((effect) => effect.toValue());
  }

  getLoreLink(): string {
    return this._extraResources.getLoreLink();
  }

  getVideoUrl(): string {
    return this._extraResources.getVideoUrl();
  }
}
