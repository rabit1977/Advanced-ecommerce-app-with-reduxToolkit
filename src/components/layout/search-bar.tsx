'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';
import { Loader2, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { priceFmt } from '@/lib/utils/formatters';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

/**
 * Search bar component with autocomplete and keyboard navigation
 * 
 * Features:
 * - Debounced search with useDeferredValue
 * - Autocomplete dropdown with product previews
 * - Keyboard navigation (Enter, Arrow keys, Escape)
 * - Loading states
 * - Click outside to close
 * - Clear search functionality
 */
export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [inputValue, setInputValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Defer the input value to debounce API calls
  const deferredQuery = useDeferredValue(inputValue);

  /**
   * Clear search when navigating away from products page
   */
  useEffect(() => {
    if (!pathname.startsWith('/products')) {
      setInputValue('');
      setSearchResults([]);
    }
  }, [pathname]);

  /**
   * Fetch search results from API
   */
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (deferredQuery.length < 2) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const response = await fetch(
          `/api/products/search?query=${encodeURIComponent(deferredQuery)}`
        );
        
        if (!response.ok) {
          throw new Error('Search failed');
        }
        
        const results = await response.json();
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [deferredQuery]);

  /**
   * Navigate to search results page
   */
  const navigateToSearchResults = useCallback(() => {
    if (inputValue.trim()) {
      startTransition(() => {
        router.push(`/products?search=${encodeURIComponent(inputValue.trim())}`);
        setIsSearchFocused(false);
        inputRef.current?.blur();
      });
    }
  }, [inputValue, router]);

  /**
   * Handle product selection from dropdown
   */
  const handleProductSelection = useCallback(() => {
    setIsSearchFocused(false);
    setInputValue('');
    setSearchResults([]);
  }, []);

  /**
   * Clear search input
   */
  const handleClearSearch = useCallback(() => {
    setInputValue('');
    setSearchResults([]);
    inputRef.current?.focus();
  }, []);

  /**
   * Handle keyboard navigation
   */
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigateToSearchResults();
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstResult = searchContainerRef.current?.querySelector('a');
      if (firstResult instanceof HTMLElement) {
        firstResult.focus();
      }
    }
  }, [navigateToSearchResults]);

  /**
   * Handle result link keyboard navigation
   */
  const handleResultKeyDown = useCallback((
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextLink = searchContainerRef.current?.querySelectorAll('a')[index + 1];
      if (nextLink instanceof HTMLElement) {
        nextLink.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        inputRef.current?.focus();
      } else {
        const prevLink = searchContainerRef.current?.querySelectorAll('a')[index - 1];
        if (prevLink instanceof HTMLElement) {
          prevLink.focus();
        }
      }
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
      inputRef.current?.focus();
    }
  }, []);

  const showResults = isSearchFocused && inputValue.length > 1;

  return (
    <div
      ref={searchContainerRef}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        if (!searchContainerRef.current?.contains(e.relatedTarget as Node)) {
          setIsSearchFocused(false);
        }
      }}
      className='relative w-full'
    >
      {/* Search Input */}
      <div className='relative'>
        <Input
          ref={inputRef}
          type='search'
          placeholder='Search products...'
          className='pr-10 pl-10'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onKeyDown={handleSearchKeyDown}
          disabled={isPending}
          aria-label='Search products'
          aria-expanded={showResults}
          aria-autocomplete='list'
          aria-controls={showResults ? 'search-results' : undefined}
        />
        
        {/* Search Icon */}
        <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        
        {/* Clear/Loading Button */}
        {inputValue && (
          <button
            onClick={handleClearSearch}
            disabled={isPending}
            aria-label='Clear search'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50'
          >
            {isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <X className='h-4 w-4' />
            )}
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div 
          id='search-results'
          role='listbox'
          className='absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border bg-background shadow-lg max-h-[400px] overflow-auto'
        >
          {isLoading ? (
            <div className='flex items-center justify-center p-8'>
              <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
            </div>
          ) : searchResults.length > 0 ? (
            <>
              {/* Results List */}
              <ul className='p-2'>
                {searchResults.map((product, index) => (
                  <li key={product.id} role='option'>
                    <Link
                      href={`/products/${product.id}`}
                      onClick={handleProductSelection}
                      onKeyDown={(e) => handleResultKeyDown(e, index)}
                      className='flex items-center gap-3 rounded-md p-2 hover:bg-accent transition-colors focus:bg-accent focus:outline-none'
                    >
                      {/* Product Image */}
                      <div className='relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-muted'>
                        <Image
                          src={product.images?.[0] || '/images/placeholder.jpg'}
                          alt={product.title}
                          fill
                          className='object-cover'
                          sizes='48px'
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className='flex-1 min-w-0'>
                        <div className='text-sm font-medium truncate'>
                          {product.title}
                        </div>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                          {product.brand && (
                            <span>{product.brand}</span>
                          )}
                          {product.price && (
                            <>
                              <span>•</span>
                              <span className='font-semibold text-foreground'>
                                {priceFmt(product.price)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* View All Results Button */}
              <div className='border-t p-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={navigateToSearchResults}
                  disabled={isPending}
                  className='w-full justify-center'
                >
                  View all results for "{inputValue}"
                </Button>
              </div>
            </>
          ) : (
            <div className='p-8 text-center'>
              <p className='text-sm text-muted-foreground'>
                No results found for "{inputValue}"
              </p>
              <p className='text-xs text-muted-foreground mt-1'>
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};