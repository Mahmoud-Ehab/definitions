import { Word } from '@/lib/types'

import { AddExampleForm } from '@/components/forms/add-example-form'
import { FormDialog } from '@/components/FormDialog'

export function ExamplesWrapper({ word }: { word: Word }) {
  return (
    <>
      <h2 className="flex justify-between mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Examples 
        <span>
          <FormDialog 
          title={`Add an Example to "${word.text}"`}
          desc={"Make sure that the example is correct. And be careful of typos; your input will not be editable."} >
            <AddExampleForm word_text={word.text} />
          </FormDialog>
        </span>
      </h2>
      {word.examples.filter(exam => exam.text != "").map((example, i) => 
      <div key={i} className="my-6">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
         {i+1}. {example.text}
        </p>
        <label className="text-sm opacity-50">{example.reference}</label>
      </div>
      )}
    </>
  )
}

