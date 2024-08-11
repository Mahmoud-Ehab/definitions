import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dancing } from '@/app/fonts';

import SearchInput from '@/components/SearchInput';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-24">
      <h1 className={cn(dancing.className, 'z-30 text-8xl text-foreground')}>Definitions</h1>
      <SearchInput />
    </main>
  );
}
