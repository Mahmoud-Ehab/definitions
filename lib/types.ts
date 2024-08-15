export type Definition = {
  text: string;
  reference: string;
  V: number;
  NV: number;
};

export type Word = {
  text: string;
  definitions: Array<Definition>;
  V: number; // validity value
  NV: number; // invalidity value
};
