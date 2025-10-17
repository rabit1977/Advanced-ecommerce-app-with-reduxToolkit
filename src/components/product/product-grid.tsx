'use client';

import { ProductGridPagination } from '@/lib/hooks/usePagination';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ProductGridControls } from './ProductGridControls';
import { ProductList } from './ProductList';
import { FilterSidebar } from './filter-sidebar';
import { useFilterMetadata } from '@/lib/hooks/useFilterMetadata';
import { useProductFilters } from '@/lib/hooks/useProductFilters';
import { ProductGridProps } from '@/lib/types';
import { ActiveFiltersBanner } from '../ActiveFiltersBanner';
import { LoadingOverlay } from '../shared/LoadingOverlay';
import { MobileFilterSheet } from '../MobileFilterSheet';
import { EmptyState } from '../shared/EmptyState';

export const ProductGrid = ({
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    isPending,
    priceTimeoutRef,
    handleCategoryChange,
    handleBrandsChange,
    handlePriceChange,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
  } = useProductFilters();

  const { activeFiltersCount, hasActiveFilters, searchQuery } =
    useFilterMetadata(
      currentCategory,
      currentBrands,
      currentMinPrice,
      currentMaxPrice
    );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current);
      }
    };
  }, [priceTimeoutRef]);

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

  const allBrands = useMemo(
    () => ['Apple', 'Samsung', 'Sony', 'Bose', 'Google', 'Anker'],
    []
  );

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

  const wrappedClearFilters = () => {
    setIsSheetOpen(false);
    handleClearFilters();
  };

  const wrappedCategoryChange = (category: string) => {
    setIsSheetOpen(false);
    handleCategoryChange(category);
  };

  const wrappedPageChange = (page: number) => {
    handlePageChange(page, gridRef);
  };

  return (
    <div className='bg-slate-50 dark:bg-slate-900 min-h-screen'>
      <div
        className='container mx-auto px-4 py-8 sm:py-12 lg:py-16'
        ref={gridRef}
      >
        <ProductGridControls
          title={currentTitle}
          subtitle={currentSubtitle}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          onFilterToggle={() => setIsSheetOpen(true)}
        />

        {hasActiveFilters && (
          <ActiveFiltersBanner
            count={activeFiltersCount}
            onClear={wrappedClearFilters}
            disabled={isPending}
          />
        )}

        <div className='lg:grid lg:grid-cols-4 lg:gap-8'>
          <aside
            className='hidden lg:block lg:col-span-1 sticky top-4 self-start'
            aria-label='Product filters'
          >
            <div className='rounded-lg border bg-card p-4 shadow-sm'>
              {filterSidebar}
            </div>
          </aside>

          <main className='lg:col-span-3'>
            <div className='relative'>
              <LoadingOverlay isLoading={isPending} />
              <ProductList products={products} />
            </div>

            {products.length === 0 && !isPending && (
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={wrappedClearFilters}
              />
            )}

            {products.length > 0 && (
              <ProductGridPagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={wrappedPageChange}
              />
            )}
          </main>
        </div>
      </div>

      <MobileFilterSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        activeFiltersCount={activeFiltersCount}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={wrappedClearFilters}
        isPending={isPending}
      >
        {filterSidebar}
      </MobileFilterSheet>
    </div>
  );
};
