import { Word } from '@/lib/types';

export function getWord(text: string, callback: (word: Word) => any, error?: (err: {error: string}) => any) {
  if (text == '') return;
  fetch(`/${text}`)
    .then((res) => res.json())
    .then((res) => {
      callback(res.word as Word || {});
    })
    .catch((err: any) => {
      if (error) error({ error: err })
    });
}

export function getWordsWithPrefix(prefix: string, callback: (words: string[]) => any) {
  if (prefix == '') return callback([]);
  fetch(`/words/${prefix}`)
  .then(res => res.json())
  .then(res => {
    callback(res.words as string[] || [])
  })
}
