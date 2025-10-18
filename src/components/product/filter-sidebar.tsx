'use client';

import { Accordion } from '@/components/ui/accordion';
import { MAX_PRICE, DEFAULT_ACCORDION_VALUES } from '@/lib/constants/filter';
import { useFilterHandlers } from '@/lib/hooks/useFilterHandlers';
import { useFilterState } from '@/lib/hooks/useFilterState';
import { FilterSidebarProps } from '@/lib/types/filter';
import { cn } from '@/lib/utils';
import React from 'react';
import { ActiveFiltersHeader } from '../ActiveFiltersHeader';
import { BrandFilter } from '../BrandFilter';
import { CategoryFilter } from '../CategoryFilter';
import { FilterLoadingIndicator } from '../FilterLoadingIndicator';
import { PriceFilter } from '../PriceFilter';

const FilterSidebar = React.memo<FilterSidebarProps>(
  ({
    categories,
    brands,
    currentCategory,
    currentBrands,
    currentMinPrice = 0,
    currentMaxPrice = MAX_PRICE,
    onCategoryChange,
    onBrandsChange,
    onPriceChange,
    className,
    showFilterCount = true,
  }) => {
    const {
      localPriceRange,
      setLocalPriceRange,
      selectedBrandsSet,
      isPriceFilterActive,
      activeFiltersCount,
    } = useFilterState(
      currentMinPrice,
      currentMaxPrice,
      currentBrands,
      currentCategory
    );

    const {
      isPending,
      handleBrandToggle,
      handleCategoryChange,
      handlePriceValueChange,
      handlePriceCommit,
    } = useFilterHandlers(
      selectedBrandsSet,
      currentCategory,
      currentMinPrice,
      currentMaxPrice,
      onBrandsChange,
      onCategoryChange,
      onPriceChange
    );

    const handlePriceChange = (value: number[]) => {
      setLocalPriceRange(handlePriceValueChange(value));
    };

    return (
      <aside className={cn('w-full', className)} aria-label='Product filters'>
        <ActiveFiltersHeader
          count={activeFiltersCount}
          show={showFilterCount}
        />

        <Accordion
          type='multiple'
          defaultValue={DEFAULT_ACCORDION_VALUES}
          className='w-full'
        >
          <CategoryFilter
            categories={categories}
            currentCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
            isPending={isPending}
            showFilterCount={showFilterCount}
          />

          <BrandFilter
            brands={brands}
            selectedBrands={selectedBrandsSet}
            onBrandToggle={handleBrandToggle}
            isPending={isPending}
            showFilterCount={showFilterCount}
          />

          <PriceFilter
            localPriceRange={localPriceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            isPending={isPending}
            showFilterCount={showFilterCount}
            isActive={isPriceFilterActive}
          />
        </Accordion>

        <FilterLoadingIndicator isPending={isPending} />
      </aside>
    );
  }
);

FilterSidebar.displayName = 'FilterSidebar';

export { FilterSidebar };
export type { FilterSidebarProps };
