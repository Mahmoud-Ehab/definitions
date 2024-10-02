'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getWordsWithPrefix } from '@/lib/queries';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type Props = {
  prefix: string;
};

export default function SuggestedWordsArea(props: Props) {
  const [words, setWords] = useState([] as Array<string>);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        getWordsWithPrefix(props.prefix, (words) => setWords(words));
      }, 350) as any,
    );
  }, [props.prefix]);

  return (
    <ScrollArea
      className={cn('z-30 m-2 h-72 w-auto rounded-md border bg-background', {
        hidden: words.length == 0,
      })}
    >
      <div className="p-4">
        <h1 className="text-md mb-4 font-medium leading-none">{props.prefix}... do you mean?</h1>
        {words.map((word, i) => (
          <Link key={i} href={`/?search=${word}`}>
            <div key={i} className="text-sm transition ease-out hover:translate-y-0.5">
              <label>{word}</label>
              <Separator className="my-2" />
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
