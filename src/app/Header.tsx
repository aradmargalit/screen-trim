import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ display: 'block', subsets: ['latin'], weight: '800' });

export default function Header() {
  return (
    <header className={`${inter.className} p-4 w-full h-full dark:bg-slate-800 bg-slate-100`}>
      <Link href="/">
        <h1 className="text-xl">SCREEN/TRIM</h1>
      </Link>
    </header>
  );
}
