import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

import { inter } from '@/app/fonts';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggleBtn } from '@/components/ModeToggleBtn';

import { Toaster } from '@/components/ui/toaster';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex h-16 w-screen items-center justify-between bg-background px-8 md:px-12">
            <ModeToggleBtn />
            <Button variant="outline">
              <LogIn className="mr-2" />
              Login with Google
            </Button>
          </header>
          {children}
          <Toaster />
          <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
