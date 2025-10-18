import { useEffect, useMemo, useState } from 'react';
import { MAX_PRICE } from '../constants/filter';

export const useFilterState = (
  currentMinPrice: number,
  currentMaxPrice: number,
  currentBrands: string,
  currentCategory: string
) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    currentMinPrice,
    currentMaxPrice,
  ]);

  // Sync local price range with props
  useEffect(() => {
    setLocalPriceRange([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

  // Memoize selected brands Set for O(1) lookup
  const selectedBrandsSet = useMemo(
    () =>
      new Set(currentBrands ? currentBrands.split(',').filter(Boolean) : []),
    [currentBrands]
  );

  const selectedBrandsCount = selectedBrandsSet.size;

  // Check if price filter is active
  const isPriceFilterActive =
    currentMinPrice > 0 || currentMaxPrice < MAX_PRICE;

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (currentCategory !== 'all') count++;
    if (selectedBrandsCount > 0) count++;
    if (isPriceFilterActive) count++;
    return count;
  }, [currentCategory, selectedBrandsCount, isPriceFilterActive]);

  return {
    localPriceRange,
    setLocalPriceRange,
    selectedBrandsSet,
    selectedBrandsCount,
    isPriceFilterActive,
    activeFiltersCount,
  };
};
