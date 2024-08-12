'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type Props = {
  word: string;
};

export default function SuggestedWordsArea(props: Props) {
  const [words, setWords] = useState([]);
  return (
    <Anim>
      <ScrollArea className="absolute z-0 m-2 h-auto max-h-72 w-auto rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">{props.word}... Do you mean?</h4>
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
    </Anim>
  );
}
