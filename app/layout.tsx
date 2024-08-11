import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

import { inter } from '@/app/fonts';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Definitions',
  description: 'A full-stack web application dictionary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'overflow-x-hidden antialiased')}>
        <header className="flex h-16 w-screen items-center justify-end bg-background px-12">
          <Button>Login with Google</Button>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
