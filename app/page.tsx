import { Suspense } from 'react'

import { cn } from '@/lib/utils'
import { dancing } from '@/app/fonts'

import SearchForm from '@/components/forms/search-form'
import { DefinitionsList } from '@/components/DefinitionsList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-24">
      <h1 className={cn(dancing.className, 'z-30 text-8xl text-foreground')}>Definitions</h1>
      <SearchForm />
      <DefinitionsList />
    </main>
  );
}
