import { StateManager, FileManager } from 'cracksdb';
const db = new StateManager('db', new FileManager({}));

export type DB_Word = {
  text: string;
  definitions: {
    text: string;
    reference: string;
  };
  V: number;
  NV: number;
};

// Initialize the words objects StateFiles
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
for (let l1 of alphabet) {
  try {
    for (let l2 of alphabet) {
      const sf = db.add<DB_Word>(l1 + l2);
      sf.extendUnitType({
        text: 'string',
        definitions: {
          text: 'string', // each definition shall be seperated with the string <nd>
          reference: 'string', // seperated as definitions but with <nr> instead
        },
        V: 'number', // validity value
        NV: 'number', // invalidity value
      });
    }
  } catch (e) {
    // TODO comment this in production!
    console.warn('db is already initialized!');
    // Assumes if just one StateFile exists then all do as well
    break;
  }
}

export { db };
