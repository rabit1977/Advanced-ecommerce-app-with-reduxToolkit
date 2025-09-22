'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';
import { Search, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';

export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Defer the input value to avoid making API calls on every keystroke
  const deferredQuery = useDeferredValue(inputValue);

  useEffect(() => {
    // Clear input when navigating away from the products page if it was a search
    if (!pathname.startsWith('/products')) {
      setInputValue('');
    }
  }, [pathname]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (deferredQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/search?query=${deferredQuery}`);
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const results = await response.json();
        setSearchResults(results);
      } catch (error) {
        console.error(error);
        setSearchResults([]); // Clear results on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [deferredQuery]);

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

  const showResults = isSearchFocused && inputValue.length > 1;

  return (
    <div
      ref={searchContainerRef}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        if (!searchContainerRef.current?.contains(e.relatedTarget as Node)) {
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
      {showResults && (
        <div className='absolute left-0 right-0 top-full z-20 mt-2 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900'>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
            </div>
          ) : searchResults.length > 0 ? (
            <>
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
            </>
          ) : (
            <p className="p-4 text-center text-sm text-slate-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};