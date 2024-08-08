import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <header className="h-24 w-screen bg-primary">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
