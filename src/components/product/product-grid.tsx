'use client';

import { Product } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ProductGridControls } from './ProductGridControls';
import { ProductGridPagination } from './ProductGridPagination';
import { ProductList } from './ProductList';
import { FilterSidebar } from './filter-sidebar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  totalCount: number;
  currentPage: number;
  currentCategory: string;
  currentBrands: string;
  currentMinPrice?: number;
  currentMaxPrice?: number;
  currentSort: SortKey;
}

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
}: ProductGridProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '') {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (newCategory: string) => {
    setIsSheetOpen(false);
    router.push(
      `${pathname}?${createQueryString({ category: newCategory, page: 1 })}`,
      { scroll: false }
    );
  };

  const handleBrandsChange = (newBrands: string[]) => {
    const brandsStr = newBrands.length > 0 ? newBrands.join(',') : null;
    // No need to close sheet here, user might want to select more
    router.push(
      `${pathname}?${createQueryString({ brands: brandsStr, page: 1 })}`,
      { scroll: false }
    );
  };

  const handlePriceChange = (newPriceRange: [number, number]) => {
    if (priceTimeoutRef.current) {
      clearTimeout(priceTimeoutRef.current);
    }
    priceTimeoutRef.current = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          minPrice: newPriceRange[0],
          maxPrice: newPriceRange[1],
          page: 1,
        })}`,
        { scroll: false }
      );
    }, 500); // 500ms debounce
  };

  const handleSortChange = (newSort: string) => {
    router.push(
      `${pathname}?${createQueryString({ sort: newSort, page: 1 })}`,
      { scroll: false }
    );
  };

  const handlePageChange = (newPage: number | string) => {
    if (typeof newPage === 'number') {
      router.push(`${pathname}?${createQueryString({ page: newPage })}`, {
        scroll: false,
      });
      setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const allCategories = useMemo(() => {
    return ['all', 'smartphones', 'laptops', 'audio', 'accessories', 'wearables'];
  }, []);

  const allBrands = useMemo(() => {
    return ['Apple', 'Samsung', 'Sony', 'Bose', 'Google', 'Anker'];
  }, []);

  const searchQuery = searchParams.get('search') || '';
  const currentTitle = searchQuery ? `Results for "${searchQuery}"` : title;
  const currentSubtitle = searchQuery
    ? `${totalCount} product(s) found`
    : subtitle;

  const filters = (
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
  );

  return (
    <div className='bg-slate-50 dark:bg-slate-900'>
      <div className='container mx-auto px-4 py-16' ref={gridRef}>
        <ProductGridControls
          title={currentTitle}
          subtitle={currentSubtitle}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          onFilterToggle={() => setIsSheetOpen(true)}
        />
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block lg:col-span-1">
            {filters}
          </div>
          <div className="lg:col-span-3">
            <ProductList products={products} />
            <ProductGridPagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={8}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="left" className="w-4/5 p-0">
          <SheetHeader className="p-4 border-b dark:border-slate-800">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your product search.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 overflow-y-auto">
            {filters}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { ProductGrid };
