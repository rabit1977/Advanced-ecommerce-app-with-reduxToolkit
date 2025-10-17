import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export const useFilterMetadata = (
  currentCategory: string,
  currentBrands: string,
  currentMinPrice?: number,
  currentMaxPrice?: number
) => {
  const searchParams = useSearchParams();

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (currentCategory !== 'all') count++;
    if (currentBrands) count += currentBrands.split(',').filter(Boolean).length;
    if (currentMinPrice && currentMinPrice > 0) count++;
    if (currentMaxPrice && currentMaxPrice < 1000) count++;
    return count;
  }, [currentCategory, currentBrands, currentMinPrice, currentMaxPrice]);

  const hasActiveFilters = activeFiltersCount > 0;

  const searchQuery = searchParams.get('search') || '';

  return {
    activeFiltersCount,
    hasActiveFilters,
    searchQuery,
  };
};
