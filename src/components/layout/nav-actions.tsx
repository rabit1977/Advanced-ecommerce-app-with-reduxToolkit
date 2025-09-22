'use client';

import {
  Button,
  buttonVariants,
} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { logout } from '@/lib/store/thunks/authThunks';
import { setTheme, setIsMenuOpen } from '@/lib/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import { Heart, Menu, Moon, Sun, User, ShoppingCart, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

export const NavActions = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const { itemIds: wishlist } = useAppSelector((state) => state.wishlist);
  const { theme } = useAppSelector((state) => state.ui);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex items-center gap-2 dark:text-slate-400'>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
        aria-label='Toggle theme'
      >
        <Sun className='h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      </Button>

      <Link
        href='/wishlist'
        aria-label='View wishlist'
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'relative'
        )}
      >
        <Heart className='h-6 w-6' />
        {hasMounted && wishlist?.length > 0 && (
          <span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-xs text-white dark:bg-slate-50 dark:text-slate-900'>
            {wishlist.length}
          </span>
        )}
      </Link>

      <Link
        href='/cart'
        aria-label='View shopping cart'
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'relative'
        )}
      >
        <ShoppingCart className='h-6 w-6' />
        {hasMounted && cartItemCount > 0 && (
          <span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-xs text-white dark:bg-slate-50 dark:text-slate-900'>
            {cartItemCount}
          </span>
        )}
      </Link>

      {hasMounted && (
        <>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex items-center gap-2'>
                  <span className='hidden sm:inline text-sm font-medium'>
                    Hi, {user.name.split(' ')[0]}
                  </span>
                  <User className='h-6 w-6' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                  {user.name} ({user.role || 'customer'})
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/account'>My Account</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href='/admin/dashboard'>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href='/auth'>
              <Button size='sm' className='flex items-center gap-2'>
                <User className='h-6 w-6' />
                <span className='hidden sm:inline'>Login</span>
              </Button>
            </Link>
          )}
        </>
      )}

      <div className='lg:hidden'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => dispatch(setIsMenuOpen(true))}
          aria-label='Open menu'
        >
          <Menu className='h-6 w-6' />
        </Button>
      </div>
    </div>
  );
};