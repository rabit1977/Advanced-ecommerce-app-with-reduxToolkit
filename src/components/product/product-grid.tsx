'use client';

import { Product } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { ProductGridControls } from './ProductGridControls';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ProductGridPagination } from '@/lib/hooks/usePagination';
import { FilterX } from 'lucide-react';
import { ProductList } from './ProductList';
import { FilterSidebar } from './filter-sidebar';

export type SortKey =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

interface ProductGridProps {
  /** Grid title */
  title?: string;
  /** Grid subtitle/description */
  subtitle?: string;
  /** Products to display */
  products: Product[];
  /** Total number of products across all pages */
  totalCount: number;
  /** Current active page */
  currentPage: number;
  /** Current selected category */
  currentCategory: string;
  /** Comma-separated selected brands */
  currentBrands: string;
  /** Minimum price filter */
  currentMinPrice?: number;
  /** Maximum price filter */
  currentMaxPrice?: number;
  /** Current sort method */
  currentSort: SortKey;
  /** Items per page */
  pageSize?: number;
}

/**
 * Optimized product grid with advanced filtering, sorting, and pagination
 *
 * Performance features:
 * - useTransition for non-blocking navigation
 * - Debounced price filter updates
 * - Memoized callbacks and computed values
 * - Optimized URL updates with scroll management
 * - Cleanup for timeout refs
 */
const ProductGrid = ({
  title = 'All Products',
  subtitle = 'Find the perfect tech for you',
  products,
  totalCount,
  currentPage,
  currentCategory,
  currentBrands,
  currentMinPrice,
  currentMaxPrice,
  currentSort,
  pageSize = 8,
}: ProductGridProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Creates URL query string from parameters
   * Optimized with useCallback to prevent recreation
   */
  const createQueryString = useCallback(
    (params: Record<string, string | number | null | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined || value === '') {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  /**
   * Navigate to new URL with optional scroll behavior
   */
  const navigateWithTransition = useCallback(
    (queryString: string, scrollToTop = false) => {
      startTransition(() => {
        router.push(`${pathname}?${queryString}`, { scroll: false });

        if (scrollToTop && gridRef.current) {
          // Small delay to ensure DOM has updated
          setTimeout(() => {
            gridRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 100);
        }
      });
    },
    [router, pathname]
  );

  /**
   * Handle category filter change
   */
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      setIsSheetOpen(false);
      const queryString = createQueryString({
        category: newCategory === 'all' ? null : newCategory,
        page: 1,
      });
      navigateWithTransition(queryString);
    },
    [createQueryString, navigateWithTransition]
  );

  /**
   * Handle brand filter change
   */
  const handleBrandsChange = useCallback(
    (newBrands: string[]) => {
      const brandsStr = newBrands.length > 0 ? newBrands.join(',') : null;
      const queryString = createQueryString({ brands: brandsStr, page: 1 });
      navigateWithTransition(queryString);
    },
    [createQueryString, navigateWithTransition]
  );

  /**
   * Handle price range change with debouncing
   */
  const handlePriceChange = useCallback(
    (newPriceRange: [number, number]) => {
      // Clear existing timeout
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current);
      }

      // Debounce the price update
      priceTimeoutRef.current = setTimeout(() => {
        const [min, max] = newPriceRange;
        const queryString = createQueryString({
          minPrice: min === 0 ? null : min,
          maxPrice: max === 1000 ? null : max, // Assuming 1000 is max
          page: 1,
        });
        navigateWithTransition(queryString);
      }, 500);
    },
    [createQueryString, navigateWithTransition]
  );

  /**
   * Handle sort change
   */
  const handleSortChange = useCallback(
    (newSort: string) => {
      const queryString = createQueryString({
        sort: newSort === 'featured' ? null : newSort,
        page: 1,
      });
      navigateWithTransition(queryString);
    },
    [createQueryString, navigateWithTransition]
  );

  /**
   * Handle page change with scroll to top
   */
  const handlePageChange = useCallback(
    (newPage: number) => {
      const queryString = createQueryString({ page: newPage });
      navigateWithTransition(queryString, true);
    },
    [createQueryString, navigateWithTransition]
  );

  /**
   * Clear all filters
   */
  const handleClearFilters = useCallback(() => {
    setIsSheetOpen(false);
    const queryString = createQueryString({
      category: null,
      brands: null,
      minPrice: null,
      maxPrice: null,
      page: 1,
    });
    navigateWithTransition(queryString);
  }, [createQueryString, navigateWithTransition]);

  /**
   * Toggle mobile filter sheet
   */
  const handleFilterToggle = useCallback(() => {
    setIsSheetOpen((prev) => !prev);
  }, []);

  /**
   * Memoized categories list
   */
  const allCategories = useMemo(
    () => [
      'all',
      'smartphones',
      'laptops',
      'audio',
      'accessories',
      'wearables',
    ],
    []
  );

  /**
   * Memoized brands list
   */
  const allBrands = useMemo(
    () => ['Apple', 'Samsung', 'Sony', 'Bose', 'Google', 'Anker'],
    []
  );

  /**
   * Calculate active filters count
   */
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (currentCategory !== 'all') count++;
    if (currentBrands) count += currentBrands.split(',').filter(Boolean).length;
    if (currentMinPrice && currentMinPrice > 0) count++;
    if (currentMaxPrice && currentMaxPrice < 1000) count++;
    return count;
  }, [currentCategory, currentBrands, currentMinPrice, currentMaxPrice]);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = activeFiltersCount > 0;

  /**
   * Get search query from params
   */
  const searchQuery = searchParams.get('search') || '';

  /**
   * Compute current title and subtitle
   */
  const currentTitle = useMemo(
    () => (searchQuery ? `Results for "${searchQuery}"` : title),
    [searchQuery, title]
  );

  const currentSubtitle = useMemo(
    () =>
      searchQuery
        ? `${totalCount.toLocaleString()} product${
            totalCount !== 1 ? 's' : ''
          } found`
        : subtitle,
    [searchQuery, totalCount, subtitle]
  );

  /**
   * Memoized filter sidebar component
   */
  const filterSidebar = useMemo(
    () => (
      <FilterSidebar
        categories={allCategories}
        brands={allBrands}
        currentCategory={currentCategory}
        currentBrands={currentBrands}
        currentMinPrice={currentMinPrice}
        currentMaxPrice={currentMaxPrice}
        onCategoryChange={handleCategoryChange}
        onBrandsChange={handleBrandsChange}
        onPriceChange={handlePriceChange}
      />
    ),
    [
      allCategories,
      allBrands,
      currentCategory,
      currentBrands,
      currentMinPrice,
      currentMaxPrice,
      handleCategoryChange,
      handleBrandsChange,
      handlePriceChange,
    ]
  );

  return (
    <div className='bg-slate-50 dark:bg-slate-900 min-h-screen'>
      <div
        className='container mx-auto px-4 py-8 sm:py-12 lg:py-16'
        ref={gridRef}
      >
        {/* Grid Controls */}
        <ProductGridControls
          title={currentTitle}
          subtitle={currentSubtitle}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          onFilterToggle={handleFilterToggle}
        />

        {/* Active Filters Banner */}
        {hasActiveFilters && (
          <div className='mb-6 flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Active Filters:</span>
              <Badge variant='secondary' className='font-semibold'>
                {activeFiltersCount}
              </Badge>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClearFilters}
              className='gap-2'
              disabled={isPending}
            >
              <FilterX className='h-4 w-4' />
              Clear All
            </Button>
          </div>
        )}

        {/* Main Grid Layout */}
        <div className='lg:grid lg:grid-cols-4 lg:gap-8'>
          {/* Desktop Sidebar */}
          <aside
            className='hidden lg:block lg:col-span-1 sticky top-4 self-start'
            aria-label='Product filters'
          >
            <div className='rounded-lg border bg-card p-4 shadow-sm'>
              {filterSidebar}
            </div>
          </aside>

          {/* Product List & Pagination */}
          <main className='lg:col-span-3'>
            {/* Loading State Overlay */}
            {isPending && (
              <div className='relative'>
                <div className='absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg'>
                  <div className='flex items-center gap-2 rounded-lg bg-card px-4 py-2 shadow-lg'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
                    <span className='text-sm font-medium'>
                      Loading products...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Product List */}
            <ProductList products={products} />

            {/* No Results Message */}
            {products.length === 0 && !isPending && (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
                <div className='rounded-full bg-muted p-4 mb-4'>
                  <FilterX className='h-8 w-8 text-muted-foreground' />
                </div>
                <h3 className='text-lg font-semibold mb-2'>
                  No products found
                </h3>
                <p className='text-sm text-muted-foreground mb-4 max-w-md'>
                  Try adjusting your filters or search criteria to find what
                  you're looking for.
                </p>
                {hasActiveFilters && (
                  <Button onClick={handleClearFilters} variant='outline'>
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <ProductGridPagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side='left'
          className='w-[85%] sm:w-[400px] p-0 flex flex-col'
        >
          <SheetHeader className='p-4 border-b dark:border-slate-800'>
            <div className='flex items-center justify-between'>
              <div>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </div>
              {hasActiveFilters && (
                <Badge variant='secondary' className='font-semibold'>
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
          </SheetHeader>

          {/* Filter Content */}
          <div className='flex-1 overflow-y-auto p-4'>{filterSidebar}</div>

          {/* Bottom Actions */}
          <div className='border-t p-4 flex gap-2'>
            <Button
              variant='outline'
              className='flex-1'
              onClick={handleClearFilters}
              disabled={!hasActiveFilters || isPending}
            >
              <FilterX className='h-4 w-4 mr-2' />
              Clear
            </Button>
            <Button
              className='flex-1'
              onClick={() => setIsSheetOpen(false)}
              disabled={isPending}
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { ProductGrid };
