import { Word } from '@/lib/types'
import { getDB } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const prefix = url.pathname.slice(1).split('/')[1].toLowerCase();

    if (prefix.length < 2) {
      throw Error("a prefix should be atleast two characters.", { cause: 400 }) 
    }

    const stateFile = (await getDB()).get(prefix.slice(0, 2));
    const words = stateFile.getListWhere((word) => (word as Word).text.startsWith(prefix)) as Array<Word>;
    const words_texts = words.map(word => word.text)

    return NextResponse.json({ words: words_texts });
  } 
  catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.cause });
  }
}
