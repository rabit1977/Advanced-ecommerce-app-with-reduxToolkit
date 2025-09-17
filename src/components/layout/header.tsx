'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { logout } from '@/lib/store/thunks/authThunks';
import { setTheme, setSearchQuery, setIsMenuOpen } from '@/lib/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.products);
  const { cart } = useAppSelector((state) => state.cart);
  const { itemIds: wishlist } = useAppSelector((state) => state.wishlist);
  const { theme } = useAppSelector((state) => state.ui);

  const router = useRouter();
  const pathname = usePathname();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const deferredQuery = useDeferredValue(inputValue);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    dispatch(setSearchQuery(deferredQuery));
  }, [deferredQuery, dispatch]);

  useEffect(() => {
    if (!pathname.startsWith('/products')) {
      setInputValue('');
    }
  }, [pathname]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const searchResults = useMemo(() => {
    if (!deferredQuery) return [];
    const query = deferredQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [deferredQuery, products]);

  const navigateToSearchResults = useCallback(() => {
    if (inputValue) {
      router.push(`/products?search=${encodeURIComponent(inputValue)}`);
      setIsSearchFocused(false);
    }
  }, [inputValue, router]);

  const handleProductSelection = () => {
    setIsSearchFocused(false);
    setInputValue('');
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateToSearchResults();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstResult = searchContainerRef.current?.querySelector('a');
      if (firstResult) {
        firstResult.focus();
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className='sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-slate-950/80 dark:border-slate-800'>
      <div className='container mx-auto flex h-16 items-center justify-between gap-4 px-4'>
        <Link href='/' className='flex flex-shrink-0 items-center gap-2'>
          <Zap className='h-6 w-6 text-slate-900 dark:text-white' />
          <span className='hidden text-xl font-bold dark:text-white sm:inline'>
            Electro
          </span>
        </Link>

        {/* --- Search Bar --- */}
        <div
          ref={searchContainerRef}
          onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
            if (
              !searchContainerRef.current?.contains(e.relatedTarget as Node)
            ) {
              setIsSearchFocused(false);
            }
          }}
          className='relative max-w-md flex-1'
        >
          <div className='relative'>
            <Input
              placeholder='Search products...'
              className='pr-10'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={handleSearchKeyDown}
            />
            {inputValue ? (
              <button
                onClick={() => setInputValue('')}
                aria-label='Clear search'
                className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 hover:text-slate-600'
              >
                <X className='h-5 w-5' />
              </button>
            ) : (
              <Search className='pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400' />
            )}
          </div>
          {isSearchFocused && inputValue && searchResults.length > 0 && (
            <div className='absolute left-0 right-0 top-full z-20 mt-2 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900'>
              <ul className='flex flex-col'>
                {searchResults.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.id}`}
                      onClick={handleProductSelection}
                      className='flex items-center gap-3 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800'
                    >
                      <div className='relative h-10 w-10 flex-shrink-0'>
                        <Image
                          src={product.images?.[0] || '/images/placeholder.jpg'}
                          alt={product.title}
                          fill
                          className='rounded-md object-cover'
                          sizes='40px'
                        />
                      </div>
                      <div>
                        <div className='text-sm font-medium dark:text-white'>
                          {product.title}
                        </div>
                        <div className='text-xs text-slate-500 dark:text-slate-400'>
                          {product.brand}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className='border-t p-2 dark:border-slate-800'>
                <Button
                  variant='link'
                  size='sm'
                  onClick={navigateToSearchResults}
                  className='w-full'
                >
                  View all results
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* --- Main Navigation --- */}
        <nav className='hidden items-center gap-4 lg:flex'>
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

        {/* --- Actions --- */}
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
            aria-label='Toggle theme'
          >
            <Sun className='h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          </Button>

          {/* 3. Updated Wishlist Link */}
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

          {/* 3. Updated Cart Link */}
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
                        Hi, {user.name.split(' ')[1]}
                      </span>
                      <User className='h-6 w-6' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem asChild>
                      <Link href='/account'>My Account</Link>
                    </DropdownMenuItem>
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

          <div className='md:hidden'>
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
      </div>
    </header>
  );
};

export { Header };