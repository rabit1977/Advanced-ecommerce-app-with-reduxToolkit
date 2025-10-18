import { useCallback, useTransition } from 'react';

export const useFilterHandlers = (
  selectedBrandsSet: Set<string>,
  currentCategory: string,
  currentMinPrice: number,
  currentMaxPrice: number,
  onBrandsChange: (brands: string[]) => void,
  onCategoryChange: (category: string) => void,
  onPriceChange: (priceRange: [number, number]) => void
) => {
  const [isPending, startTransition] = useTransition();

  const handleBrandToggle = useCallback(
    (brand: string, checked: boolean) => {
      startTransition(() => {
        const newSelectedBrands = new Set(selectedBrandsSet);

        if (checked) {
          newSelectedBrands.add(brand);
        } else {
          newSelectedBrands.delete(brand);
        }

        onBrandsChange(Array.from(newSelectedBrands));
      });
    },
    [selectedBrandsSet, onBrandsChange]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category !== currentCategory) {
        startTransition(() => {
          onCategoryChange(category);
        });
      }
    },
    [currentCategory, onCategoryChange]
  );

  const handlePriceValueChange = useCallback((value: number[]) => {
    return value as [number, number];
  }, []);

  const handlePriceCommit = useCallback(
    (value: number[]) => {
      const [min, max] = value;
      if (min !== currentMinPrice || max !== currentMaxPrice) {
        startTransition(() => {
          onPriceChange(value as [number, number]);
        });
      }
    },
    [currentMinPrice, currentMaxPrice, onPriceChange]
  );

  return {
    isPending,
    handleBrandToggle,
    handleCategoryChange,
    handlePriceValueChange,
    handlePriceCommit,
  };
};