'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SuggestedWordsArea from '@/components/SuggestedWordsArea';
import { CiSearch } from 'react-icons/ci';

export default function SearchFrom() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [word, setWord] = useState('');

  useEffect(() => {
    const search = searchParams.get('search')
    setWord(search || '')
  }, [])

  function inputHandler({ target }) {
    setWord(target.value || '');
  }

  function formHandler(e) {
    e.preventDefault();
    router.push(`/?search=${word}`);
  }

  return (
    <div className="relative m-12 w-full md:w-1/2">
      <form onSubmit={formHandler} className="z-20 flex">
        <Input
          className="mx-2 text-center text-lg"
          value={word}
          type="text"
          placeholder="Write a word"
          onChange={inputHandler}
        />
        <Button variant="outline" size="icon">
          <CiSearch />
        </Button>
      </form>
    </div>
  );
}
