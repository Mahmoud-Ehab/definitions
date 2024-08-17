import { Word } from '@/lib/types';

import { AddDefinitionForm } from '@/components/forms/add-def-form';
import { FormDialog } from '@/components/FormDialog';
import { ReportForm } from '@/components/forms/report-form';
import { Flag } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DefinitionsWrapper({ word }: { word: Word }) {
  return (
    <>
      <h2 className="mt-10 flex scroll-m-20 justify-between border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Definitions
        <span>
          <FormDialog
            title={`Add Definition to "${word.text}"`}
            desc={
              'Make sure that the definition is correct. And be careful of typos; your input will not be editable.'
            }
          >
            <AddDefinitionForm word_text={word.text} />
          </FormDialog>
        </span>
      </h2>
      {word.definitions.map((def, i) => (
        <div key={i} className="my-6 flex items-end">
          <Popover>
            <PopoverTrigger>
              <div className="text-left">
                <p className="leading-7 [&:not(:first-child)]:mt-6">{def.text}</p>
                <label className="text-sm opacity-50">{def.reference}</label>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <ReportForm
                className="m-0 p-0"
                word_text={word.text}
                report_element="definition"
                element_id={def.reference}
              >
                <div className="flex items-center">
                  <Flag height={18} />
                  <span className="ml-2">Report</span>
                </div>
              </ReportForm>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </>
  );
}
