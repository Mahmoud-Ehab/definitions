export type Definition = {
  text: string;
  reference: string;
}

export type Word = {
  text: string;
  definitions: Array<Definition>;
  examples: string; // examples are seperated by new line char '\n'
  embeds: string; // links of videos or articles... seperated as examples
  V: number; // validity value
  NV: number; // invalidity value
}
