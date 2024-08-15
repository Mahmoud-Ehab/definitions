import { Word } from '@/lib/types'

import { AddMentionForm } from '@/components/forms/add-mention-form'
import { FormDialog } from '@/components/FormDialog'

export function MentionsWrapper({ word }: { word: Word }) {
  return (
    <>
      <h2 className="flex justify-between mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Mentions
        <span>
          <FormDialog 
          title={`Add an Attachment to "${word.text}"`}
          desc={"Make sure that data is correct. And be careful of typos; your input will not be editable."} >
            <AddMentionForm word_text={word.text} />
          </FormDialog>
        </span>
      </h2>
      {word.mentions.filter(mention => mention.title != "").map((mention, i) => 
      <div key={i} className="my-6 p-6 bg-secondary rounded-xl shadow transition md:hover:scale-105">
        <h3 className="leading-7 text-lg mb-2 font-semibold [&:not(:first-child)]:mt-6">
         {mention.title}
        </h3>
        <iframe src={mention.hyperlink} className="w-full h-96 rounded"></iframe>
        <a className="text-sm opacity-50" href={mention.hyperlink}>{mention.hyperlink}</a>
      </div>
      )}
    </>
  )
}

