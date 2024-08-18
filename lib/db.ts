'use server';

import { createContext } from 'react';
import { StateManager, FileManager } from 'cracksdb';
import { Word, DB_Word } from '@/lib/types';
import path from 'node:path';

function createDB() {
  const RAILWAY_PATH = process.env.RAILWAY_VOLUME_MOUNT_PATH;
  if (!RAILWAY_PATH || RAILWAY_PATH === '') {
    console.warn('RAILWAY_VOLUME_MOUNT_PATH undefined.');
  }
  console.log('JUST for debugging: ', process.env);
  const dbpath = path.join(RAILWAY_PATH || './', 'db');
  console.log('db path: ', dbpath);
  const db = new StateManager(dbpath, new FileManager({}));
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
