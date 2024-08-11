import { Word, Definition } from "@/lib/types"

export type State = {
  word: Word
  errors?: {
    text?: string;
  } 
}

export async function addWord(text: string, definitions?: Array<Definition>, examples?: Array<string>, embeds?: Array<string>) {
}
