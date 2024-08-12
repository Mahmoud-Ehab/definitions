'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Terminal, LoaderPinwheel, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AddWordForm } from '@/components/forms/add-word-form';

import { getWord } from '@/lib/queries';
import { Word } from '@/lib/types';

export function DefinitionsList() {
  const [word, setWord] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setWord(null)
    const search = searchParams.get('search');
    getWord(search || '', (word) => setWord(word), (err) => setWord(err));
  }, [searchParams]);

  return (
    <>
      {word && word.text && (
      <div className="md:w-1/2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {word.text.charAt(0).toUpperCase() + word.text.slice(1)} 
        </h1>
        <h2 className="flex justify-between mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Definitions<span><Button variant="ghost" size="icon"><Plus /></Button></span>
        </h2>
        {word.definitions.map((def, i) => 
        <div key={i} className="my-6">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {def.text}
          </p>
          <label className="text-sm opacity-50">{def.reference}</label>
        </div>
        )}
      </div>
      )}

      {word && !word.text && !word.error && searchParams.get('search') && (
        <>
          <Alert className="md:w-1/2">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Word not found!</AlertTitle>
            <AlertDescription>
              You may help others and kindly add it soon with the form below.
            </AlertDescription>
          </Alert>
          <AddWordForm />
        </>
      )}

      {!word && searchParams.get('search') && 
        <LoaderPinwheel className="animate-spin" />
      }

      {word?.error && 
        <Alert variant="destructive" className="md:w-1/2">
          <AlertTitle>{word.error}</AlertTitle>
        </Alert>
      }
    </>
  );
}
