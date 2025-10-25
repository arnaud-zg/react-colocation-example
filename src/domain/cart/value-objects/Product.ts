import type { Money } from "./Money";

export interface Product {
  id: string;
  name: string;
  price: Money;
  imageUrl: string;
  knowledge: KnowledgeContent;
}

export type KnowledgeProfile = keyof KnowledgeContent;

export interface KnowledgeContent {
  beginning: ProfileDetails;
  adventurer: ProfileDetails;
  expert: ProfileDetails;
}

export interface ProfileDetails {
  description: string;
  stats: Stats;
  effects: string[];
  extraResources: ExtraResources;
}

export interface Stats {
  power: number;
  durability: number;
  manaBoost: number;
}

export interface ExtraResources {
  loreLink: string;
  videoUrl: string;
}
