import Image from 'next/image';
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import { dancing } from "@/app/fonts"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-primary">
      <h1 className={cn(dancing.className, "text-8xl text-secondary")}>Definitions</h1>
    </main>
  );
}
