export interface Weakness {
  type: string;
  value: string;
}

export interface Resistance {
  type: string;
  value: string;
}

export interface Card {
  id: string;
  name: string;
  images: { large: string };
  attacks?: { name: string; damage: string; text: string; cost: string[] }[];
}
