export type Definition = {
  text: string;
  reference: string;
  V: number;
  NV: number;
};

export type Example = {
  text: string;
  reference: string;
  V: number;
  NV: number;
}

export type Mention = {
  title: string;
  hyperlink: string;
  V: number;
  NV: number;
}

export type Word = {
  text: string;
  definitions: Array<Definition>;
  examples: Array<Example>;
  mentions: Array<Mention>;
  V: number; // validity value
  NV: number; // invalidity value
};

// cracksdb Type object
export const DB_Word = {
  text: 'string',
  definitions: {
    length: 'number',
    text: 'string',
    reference: 'string',
    V: 'number',
    NV: 'number',
  },
  examples: {
    length: 'number',
    text: 'string',
    reference: 'string',
    V: 'number',
    NV: 'number'
  },
  mentions: {
    length: 'number',
    title: 'string',
    hyperlink: 'string',
    V: 'number',
    NV: 'number'
  },
  V: 'number', // validity value
  NV: 'number', // invalidity value
}
