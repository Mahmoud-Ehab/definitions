'use server';

import { db } from '@/lib/db';
import { Word } from '@/lib/types';
import { z } from 'zod';

const formSchema = z.object({
  word_text: z.string().min(2).max(50),
  def_content: z.string().min(10).max(255),
  def_reference: z.string().min(10).max(50),
});

export type State = {
  message: string;
  errors?: {
    word_text?: string[];
    def_content?: string[];
    def_reference?: string[];
  };
};

export async function addWord(_: State, formData: FormData): Promise<State> {
  const valFields = formSchema.safeParse({
    word_text: formData.get('word_text'),
    def_content: formData.get('def_content'),
    def_reference: formData.get('def_reference'),
  });

  if (!valFields.success) {
    return {
      message: 'Error submitting the form!',
      errors: valFields.error.flatten().fieldErrors,
    };
  }

  const { word_text, def_content, def_reference } = valFields.data;
  const newWord = {
    text: word_text.toLowerCase(),
    definitions: {
      text: def_content.replaceAll('<nd>', ' '),
      reference: def_reference.replaceAll('<nr>', ' '),
    },
    V: 1,
    NV: 0,
  };

  try {
    const sf = db.get(newWord.text.slice(0, 2));
    const exists = sf.getWhere((word) => (word as Word).text == newWord.text);
    if ((exists as Word).text) {
      return {
        message: newWord.text + ' already exists.',
        errors: {
          word_text: ['word already exists'],
        },
      };
    }
    sf.add(newWord);
    return {
      message: newWord.text + ' has been successfully added.',
    };
  } catch (err) {
    console.error(err);
    return {
      message: 'Something went wrong!',
    };
  }
}
