import { Word } from '@/lib/types'

import { AddDefinitionForm } from '@/components/forms/add-def-form'
import { FormDialog } from '@/components/FormDialog'

export function DefinitionsWrapper({ word }: { word: Word }) {
  return (
    <>
      <h2 className="flex justify-between mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Definitions
        <span>
          <FormDialog 
          title={`Add Definition to "${word.text}"`}
          desc={"Make sure that the definition is correct. And be careful of typos; your input will not be editable."} >
            <AddDefinitionForm word_text={word.text} />
          </FormDialog>
        </span>
      </h2>
      {word.definitions.map((def, i) => 
      <div key={i} className="my-6">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {def.text}
        </p>
        <label className="text-sm opacity-50">{def.reference}</label>
      </div>
      )}
    </>
  )
}

