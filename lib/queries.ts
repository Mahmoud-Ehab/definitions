import { Word } from '@/lib/types'

export function getWord(text: string, callback: (word: Word) => any) {
  if (text == '') return
  fetch(`/${text}`)
  .then(res => res.json())
  .then(res => {
    callback(res.word as Word)
  })
  .catch(err => console.error(err))
}
