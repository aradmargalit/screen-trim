import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Screen Trim 2024',
  title: 'Screen Trim',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
