import { Word, Definition } from "@/lib/types"

import { z } from "zod"
 
const formSchema = z.object({
  word_text: z.string().min(2).max(50),
  def_content: z.string().min(10).max(255),
  def_reference: z.string().min(10).max(50),
})

export type State = {
  word: Word
  errors?: {
    text?: string;
  } 
}

export async function addWord(text: string, definitions?: Array<Definition>) {
}
