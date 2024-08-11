'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CiSearch } from 'react-icons/ci';

import SuggestedWordsArea from '@/components/SuggestedWordsArea';
import { useAnimate, FadeIn } from 'react-animation-maker';

type Props = {
  onChange?: Function;
};

export default function SearchInput(props: Props) {
  const router = useRouter();
  const [word, setWord] = useState('');
  const [FadeInAnim, _] = useAnimate(FadeIn);

  function inputHandler({ target }) {
    setWord(target.value);
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
          type="text"
          placeholder="Write a word"
          onChange={inputHandler}
        />
        <Button variant="outline" size="icon">
          <CiSearch />
        </Button>
      </form>
      <FadeInAnim>
        <SuggestedWordsArea word={word} />
      </FadeInAnim>
    </div>
  );
}
