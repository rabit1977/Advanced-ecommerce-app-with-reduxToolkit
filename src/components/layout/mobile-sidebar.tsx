'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setIsMenuOpen } from '@/lib/store/slices/uiSlice';
import { setUser } from '@/lib/store/slices/userSlice';
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, User, X } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';

// NavLink Sub-component (as created before)
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}
const NavLink = ({ href, children, className, onClick }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      'text-base font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
      className
    )}
  >
    {children}
  </Link>
);

const MobileSidebar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isMenuOpen } = useAppSelector((state) => state.ui);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => dispatch(setIsMenuOpen(false));

  // 2. Use the hook to handle clicks outside the menuRef
  useOnClickOutside(menuRef, closeMenu);

  const handleLogout = () => {
    dispatch(setUser(null));
    closeMenu();
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 bg-black/60 md:hidden'
        >
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-950'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-col h-full p-6 overflow-y-auto'>
              <button
                onClick={closeMenu}
                className='self-end p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800'
                aria-label='Close menu'
              >
                <X className='h-5 w-5' />
              </button>

              {user ? (
                <div className='flex items-center gap-3 border-b pb-4 dark:border-slate-800 flex-shrink-0'>
                  <div className='w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200'>
                    <User className='h-6 w-6' />
                  </div>
                  <div>
                    <p className='font-semibold dark:text-white'>{user.name}</p>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      {user.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='flex-shrink-0'>
                  <Link href='/auth' onClick={closeMenu} className='w-full'>
                    <Button size='lg' className='w-full'>
                      Login / Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              <nav className='mt-8 flex flex-col gap-6 flex-grow'>
                <NavLink href='/' onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink href='/products' onClick={closeMenu}>
                  All Products
                </NavLink>
                <NavLink href='/about' onClick={closeMenu}>
                  About Us
                </NavLink>
                <NavLink href='/contact' onClick={closeMenu}>
                  Contact Us
                </NavLink>
                {user && (
                  <NavLink
                    href='/account'
                    onClick={closeMenu}
                    className='font-bold text-indigo-600 dark:text-indigo-400'
                  >
                    My Account
                  </NavLink>
                )}
              </nav>

              {user && (
                <div className='mt-auto border-t pt-4 flex-shrink-0 dark:border-slate-800'>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={handleLogout}
                  >
                    <LogOut className='h-4 w-4 mr-2' />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { MobileSidebar };
