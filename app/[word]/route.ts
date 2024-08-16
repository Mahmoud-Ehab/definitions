import { Word } from '@/lib/types';
import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const word_text = url.pathname.slice(1).toLowerCase();
    const stateFile = (await getDB()).get(word_text.slice(0, 2));
    const word = stateFile.getWhere((word: any) => (word as Word).text == word_text) as Word;
    return NextResponse.json({ word }); // reports attribute is removed for user privacy
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'word not found' }, { status: 404 });
  }
}
