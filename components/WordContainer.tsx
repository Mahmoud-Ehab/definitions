'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Terminal, LoaderPinwheel } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { AddWordForm } from '@/components/forms/add-word-form';
import { ReportForm } from '@/components/forms/report-form'

import { DefinitionsWrapper } from '@/components/wrappers/definitions-wrapper';
import { ExamplesWrapper } from '@/components/wrappers/examples-wrapper';
import { MentionsWrapper } from '@/components/wrappers/mentions-wrapper';

import { getWord } from '@/lib/queries';
import { Word } from '@/lib/types';

export function WordContainer() {
  const [word, setWord] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setWord(null);
    const search = searchParams.get('search');
    getWord(
      search || '',
      (word) => setWord(word),
      (err) => setWord(err),
    );
  }, [searchParams]);

  return (
    <>
      {word && word.text && (
        <div className="md:w-1/2">
          <h1 className="flex items-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <span>{word.text.charAt(0).toUpperCase() + word.text.slice(1)}</span>
            <ReportForm word_text={word.text} report_element="word" />
          </h1>
          <DefinitionsWrapper word={word} />
          <ExamplesWrapper word={word} />
          <MentionsWrapper word={word} />
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

      {!word && searchParams.get('search') && <LoaderPinwheel className="animate-spin" />}

      {word?.error && (
        <Alert variant="destructive" className="md:w-1/2">
          <AlertTitle>{word.error}</AlertTitle>
        </Alert>
      )}
    </>
  );
}
