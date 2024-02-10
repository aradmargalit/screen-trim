import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import icon from '../assets/trim.png';

const inter = Inter({ display: 'block', subsets: ['latin'], weight: '800' });

export default function Header() {
  return (
    <header className={`${inter.className} p-4 w-full h-full dark:bg-slate-800 bg-slate-100`}>
      <Link href="/">
        <div className="flex items-center">
          <h1 className="text-xl mr-3">SCREEN/TRIM</h1>
          <Image src={icon} height={40} alt="phone with hourglass" />
        </div>
      </Link>
    </header>
  );
}
