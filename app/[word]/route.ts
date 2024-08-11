import { db } from '@/lib/db'
import { Word } from '@/lib/types'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const word_text = url.pathname.slice(1).toLowerCase()

    const stateFile = db.get(word_text.slice(0, 2))
    const word = stateFile.getWhere(word => (word as Word).text == word_text) as Word
    return Response.json({ word });
  }
  catch(e) {
    return Response.error()
  }
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const word_text = url.pathname.slice(1).toLowerCase()

    const stateFile = db.get(word_text.slice(0, 2))
    const word = stateFile.getWhere(word => (word as Word).text == word_text) as Word
    if (word) {
      throw Error(`The word '${word_text}' already exist.`)
    }
    
    const payload = await req.json()
    stateFile.add({
      text: payload.text,
      definitions: payload.definitions ? payload.definitions : [],
      examples: payload.examples ? payload.examples.join('\n') : "",
      embeds: payload.embeds ? payload.embeds.join('\n') : "",
      V: 1,
      IV: 0
    })

    return Response.json({ success: true });
  }
  catch(e) {
    console.error(e)
    return Response.error()
  }
}
