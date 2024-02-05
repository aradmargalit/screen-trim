import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ display: 'block', subsets: ['latin'], weight: '800' });

export default function Header() {
  return (
    <header className={`${inter.className} p-4 w-full h-full bg-slate-800`}>
      <Link href="/">
        <h1 className="text-xl">SCREEN/TRIM</h1>
      </Link>
    </header>
  );
}
