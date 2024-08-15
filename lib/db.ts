'use server';

import { createContext } from 'react';
import { StateManager, FileManager } from 'cracksdb';
import { Word, DB_Word } from '@/lib/types';

function createDB() {
  const db = new StateManager('db', new FileManager({}));
  // Initialize the words objects StateFiles
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let l1 of alphabet) {
    try {
      for (let l2 of alphabet) {
        const sf = db.add<Word>(l1 + l2);
        sf.extendUnitType(DB_Word);
      }
    } catch (e) {
      // TODO comment this in production!
      console.warn(Date().split(' ')[4] + ': db is already initialized!');
      // Assumes if just one StateFile exists then all do as well
      break;
    }
  }
  return db;
}

export async function getDB() {
  if (!global.db) {
    global.db = createDB();
  }
  return global.db;
}
