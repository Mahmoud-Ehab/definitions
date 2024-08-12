import { db, DB_Word } from '@/lib/db';
import { Word } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const word_text = url.pathname.slice(1).toLowerCase();

    const stateFile = db.get(word_text.slice(0, 2));
    const word = stateFile.getWhere((word) => (word as Word).text == word_text) as DB_Word;

    // initialize definitions list
    const def_list = [];
    const texts = word.definitions.text.split('<nd>');
    const refs = word.definitions.reference.split('<nr>');
    for (let i = 0; i < texts.length; i++) {
      def_list.push({
        text: texts[i],
        reference: refs[i],
      });
    }
    (word as unknown as Word).definitions = def_list;

    return Response.json({ word });
  } catch (e) {
    return Response.error();
  }
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const word_text = url.pathname.slice(1).toLowerCase();

    const stateFile = db.get(word_text.slice(0, 2));
    const word = stateFile.getWhere((word) => (word as Word).text == word_text) as Word;
    if (word) {
      throw Error(`The word '${word_text}' already exist.`);
    }

    const payload = await req.json();
    stateFile.add({
      text: payload.text,
      definitions: payload.definitions ? payload.definitions : {},
      V: 1,
      IV: 0,
    });

    return Response.json({ success: true });
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}
