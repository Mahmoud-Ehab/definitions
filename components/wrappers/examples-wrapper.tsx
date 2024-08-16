import { Word } from '@/lib/types';

import { AddExampleForm } from '@/components/forms/add-example-form';
import { FormDialog } from '@/components/FormDialog';
import { ReportForm } from '@/components/forms/report-form';
import { Flag } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function ExamplesWrapper({ word }: { word: Word }) {
  return (
    <>
      <h2 className="mt-10 flex scroll-m-20 justify-between border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Examples
        <span>
          <FormDialog
            title={`Add an Example to "${word.text}"`}
            desc={
              'Make sure that the example is correct. And be careful of typos; your input will not be editable.'
            }
          >
            <AddExampleForm word_text={word.text} />
          </FormDialog>
        </span>
      </h2>
      {word.examples
        .filter((exam) => exam.text != '')
        .map((example, i) => (
          <div key={i} className="my-6 flex">
            <Popover>
              <PopoverTrigger>
                <div className="text-left">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {i + 1}. {example.text}
                  </p>
                  <label className="text-sm opacity-50">{example.reference}</label>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <ReportForm
                  className="m-0 p-0"
                  word_text={word.text}
                  report_element="example"
                  element_id={example.text}
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
