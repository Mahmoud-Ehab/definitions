import { StateManager, FileManager } from 'cracksdb'
const db = new StateManager("db", new FileManager({}))

// TODO comment this in production!
import { Word } from '@/lib/types'
const alphabet = "abcdefghijklmnopqrstuvwxyz"
for (let l1 of alphabet) {
  try {
    for (let l2 of alphabet) {
        const sf = db.add<Word>(l1 + l2)
        sf.extendUnitType({
          text: "string",
          definitions: {
            text: "string",
            reference: "string"
          },
          examples: "string", // examples are seperated by new line char '\n'
          embeds: "string", // links of videos or articles... seperated as examples
          V: "number", // validity value
          NV: "number" // invalidity value
        })
      }
  }
  catch(e) {
    console.warn("db is already initialized!")
    break
  }
}

export { db }
