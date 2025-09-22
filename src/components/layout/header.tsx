'use client';

import { Zap } from 'lucide-react';
import Link from 'next/link';
import { NavActions } from './nav-actions';
import { SearchBar } from './search-bar';

const Header = () => {
  return (
    <header className='sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-slate-950/80 dark:border-slate-800'>
      <div className='container mx-auto flex h-16 items-center justify-between gap-4 px-4'>
        <Link href='/' className='flex flex-shrink-0 items-center gap-2'>
          <Zap className='h-6 w-6 text-slate-900 dark:text-white' />
          <span className='hidden text-xl font-bold dark:text-white sm:inline'>
            Electro
          </span>
        </Link>

        <SearchBar />

        <nav className='hidden items-center gap-4 lg:flex dark:text-slate-400'>
          <Link
            href='/products'
            className='text-sm font-medium hover:text-slate-900 dark:hover:text-white'
          >
            Products
          </Link>
          <Link
            href='/about'
            className='text-sm font-medium hover:text-slate-900 dark:hover:text-white'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='text-sm font-medium hover:text-slate-900 dark:hover:text-white'
          >
            Contact
          </Link>
        </nav>

        <NavActions />
      </div>
    </header>
  );
};

export { Header };
