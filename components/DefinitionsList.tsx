'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Terminal, LoaderPinwheel } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { AddWordForm } from '@/components/forms/add-word-form';

import { getWord } from '@/lib/queries';
import { Word } from '@/lib/types';

export function DefinitionsList() {
  const [word, setWord] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    getWord(search || '', (word) => setWord(word));
  }, [searchParams]);

  return (
    <>
      {word && word.text && (
        <div>
          <h1>the word: {word.text}</h1>
          {word.definitions.map((def, i) => (
            <>
              <p>{def.text}</p>
              <p>{def.reference}</p>
            </>
          ))}
        </div>
      )}
      {word && !word.text && searchParams.get('search') && (
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
      {!word && searchParams.get('search') && <LoaderPinwheel className="animate-spin" />}
    </>
  );
}
