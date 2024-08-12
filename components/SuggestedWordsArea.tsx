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
  const [words, setWords] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    if (timeoutId) { 
      clearTimeout(timeoutId)
    }
    setTimeoutId(setTimeout(() => {
      getWordsWithPrefix(props.prefix, (words) => setWords(words))
    }, 350)) 
  }, [props.prefix])

  return (
    <ScrollArea className={cn(
      "z-30 bg-background m-2 h-auto max-h-72 w-auto rounded-md border",
      {'hidden': words.length == 0}
    )}>
      <div className="p-4">
        <h1 className="mb-4 text-md font-medium leading-none">{props.prefix}... do you mean?</h1>
        {words.map((word, i) => (
          <Link href={`/?search=${word}`}>
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
