import { Word } from '@/lib/types';

import { AddMentionForm } from '@/components/forms/add-mention-form';
import { FormDialog } from '@/components/FormDialog';
import { ReportForm } from '@/components/forms/report-form';
import { Flag } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function MentionsWrapper({ word }: { word: Word }) {
  return (
    <>
      <h2 className="mt-10 flex scroll-m-20 justify-between border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Mentions
        <span>
          <FormDialog
            title={`Add an Attachment to "${word.text}"`}
            desc={
              'Make sure that data is correct. And be careful of typos; your input will not be editable.'
            }
          >
            <AddMentionForm word_text={word.text} />
          </FormDialog>
        </span>
      </h2>
      {word.mentions
        .filter((mention) => mention.title != '')
        .map((mention, i) => (
          <div key={i} className="w-full">
            <Popover>
              <PopoverTrigger className="w-full text-left">
                <div
                  key={i}
                  className="my-6 rounded-xl bg-secondary p-6 shadow transition md:hover:scale-105"
                >
                  <h3 className="mb-2 text-lg font-semibold leading-7 [&:not(:first-child)]:mt-6">
                    {mention.title}
                  </h3>
                  <iframe src={mention.hyperlink} className="h-96 w-full rounded"></iframe>
                  <a className="text-sm opacity-50" href={mention.hyperlink}>
                    {mention.hyperlink}
                  </a>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <ReportForm
                  className="m-0 p-0"
                  word_text={word.text}
                  report_element="mention"
                  element_id={mention.hyperlink}
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
