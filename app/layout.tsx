import type { Metadata } from 'next';
import { cn } from '@/lib/utils' 
import './globals.css';

import { inter } from "@/app/fonts"
import { Button } from "@/components/ui/button"

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
      <body className={cn(inter.className, "overflow-x-hidden")}>
        <header className="flex items-center justify-end h-16 px-12 w-screen bg-primary">
          <Button>Login with Google</Button>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
