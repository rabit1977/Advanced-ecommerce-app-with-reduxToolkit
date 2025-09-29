'use client';

import { ChevronDown } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { priceFmt } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const MAX_PRICE = 1000;

interface FilterSidebarProps {
  /** Available categories for filtering */
  categories: string[];
  /** Available brands for filtering */
  brands: string[];
  /** Currently selected category */
  currentCategory: string;
  /** Comma-separated string of selected brands */
  currentBrands: string;
  /** Minimum price filter value */
  currentMinPrice?: number;
  /** Maximum price filter value */
  currentMaxPrice?: number;
  /** Callback when category changes */
  onCategoryChange: (category: string) => void;
  /** Callback when brand selection changes */
  onBrandsChange: (brands: string[]) => void;
  /** Callback when price range changes */
  onPriceChange: (priceRange: [number, number]) => void;
  /** Optional custom class name */
  className?: string;
  /** Whether to show active filter count badges */
  showFilterCount?: boolean;
}

/**
 * Optimized filter sidebar component with performance enhancements
 * 
 * Performance improvements:
 * - useCallback for memoized event handlers
 * - useTransition for non-blocking UI updates
 * - Optimized re-renders with React.memo
 * - Native Checkbox component instead of HTML input
 * - Debounced price changes
 */
const FilterSidebar = React.memo<FilterSidebarProps>(({
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
  const [isPending, startTransition] = useTransition();
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
    () => new Set(currentBrands ? currentBrands.split(',').filter(Boolean) : []),
    [currentBrands]
  );

  // Convert Set to array for count display
  const selectedBrandsCount = selectedBrandsSet.size;

  // Memoized brand selection handler
  const handleBrandToggle = useCallback((brand: string, checked: boolean) => {
    startTransition(() => {
      const newSelectedBrands = new Set(selectedBrandsSet);
      
      if (checked) {
        newSelectedBrands.add(brand);
      } else {
        newSelectedBrands.delete(brand);
      }
      
      onBrandsChange(Array.from(newSelectedBrands));
    });
  }, [selectedBrandsSet, onBrandsChange]);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: string) => {
    if (category !== currentCategory) {
      startTransition(() => {
        onCategoryChange(category);
      });
    }
  }, [currentCategory, onCategoryChange]);

  // Memoized price change handlers
  const handlePriceValueChange = useCallback((value: number[]) => {
    setLocalPriceRange(value as [number, number]);
  }, []);

  const handlePriceCommit = useCallback((value: number[]) => {
    const [min, max] = value;
    if (min !== currentMinPrice || max !== currentMaxPrice) {
      startTransition(() => {
        onPriceChange(value as [number, number]);
      });
    }
  }, [currentMinPrice, currentMaxPrice, onPriceChange]);

  // Check if price filter is active (non-default values)
  const isPriceFilterActive = currentMinPrice > 0 || currentMaxPrice < MAX_PRICE;

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (currentCategory !== 'all') count++;
    if (selectedBrandsCount > 0) count++;
    if (isPriceFilterActive) count++;
    return count;
  }, [currentCategory, selectedBrandsCount, isPriceFilterActive]);

  return (
    <aside className={cn('w-full', className)} aria-label="Product filters">
      {/* Active Filters Summary */}
      {showFilterCount && activeFiltersCount > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2">
          <span className="text-sm font-medium">Active Filters</span>
          <Badge variant="secondary" className="font-semibold">
            {activeFiltersCount}
          </Badge>
        </div>
      )}

      <Accordion 
        type="multiple" 
        defaultValue={['category', 'brands', 'price']} 
        className="w-full"
      >
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger 
            className={cn(
              "text-lg font-medium hover:no-underline",
              isPending && "opacity-50"
            )}
          >
            <div className="flex items-center gap-2">
              <span>Category</span>
              {currentCategory !== 'all' && showFilterCount && (
                <Badge variant="default" className="h-5 px-1.5 text-xs">
                  1
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-1.5 pt-2" role="group" aria-label="Category filters">
              {categories.map((category) => {
                const isActive = currentCategory === category;
                const label = category === 'all' ? 'All Categories' : category;
                
                return (
                  <Button
                    key={category}
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "justify-start font-normal transition-all",
                      isActive && "font-medium shadow-sm"
                    )}
                    aria-pressed={isActive}
                    disabled={isPending}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brands">
          <AccordionTrigger 
            className={cn(
              "text-lg font-medium hover:no-underline",
              isPending && "opacity-50"
            )}
          >
            <div className="flex items-center gap-2">
              <span>Brand</span>
              {selectedBrandsCount > 0 && showFilterCount && (
                <Badge variant="default" className="h-5 px-1.5 text-xs">
                  {selectedBrandsCount}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div 
              className="grid grid-cols-1 gap-3 pt-2" 
              role="group" 
              aria-label="Brand filters"
            >
              {brands.map((brand) => {
                const isChecked = selectedBrandsSet.has(brand);
                const checkboxId = `brand-${brand}`;
                
                return (
                  <div 
                    key={brand} 
                    className="flex items-center gap-3 group"
                  >
                    <Checkbox
                      id={checkboxId}
                      checked={isChecked}
                      onCheckedChange={(checked) => 
                        handleBrandToggle(brand, checked as boolean)
                      }
                      disabled={isPending}
                      className="transition-all"
                    />
                    <Label 
                      htmlFor={checkboxId} 
                      className={cn(
                        "flex-1 cursor-pointer text-sm font-normal transition-colors",
                        "group-hover:text-foreground",
                        isChecked && "font-medium",
                        isPending && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {brand}
                    </Label>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger 
            className={cn(
              "text-lg font-medium hover:no-underline",
              isPending && "opacity-50"
            )}
          >
            <div className="flex items-center gap-2">
              <span>Price</span>
              {isPriceFilterActive && showFilterCount && (
                <Badge variant="default" className="h-5 px-1.5 text-xs">
                  1
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div 
              className="space-y-4"
              role="group"
              aria-label="Price range filter"
            >
              {/* Price Range Display */}
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="rounded-md bg-muted px-2.5 py-1">
                  {priceFmt(localPriceRange[0])}
                </span>
                <span className="text-muted-foreground">to</span>
                <span className="rounded-md bg-muted px-2.5 py-1">
                  {priceFmt(localPriceRange[1])}
                </span>
              </div>

              {/* Price Slider */}
              <Slider
                min={0}
                max={MAX_PRICE}
                step={10}
                value={localPriceRange}
                onValueChange={handlePriceValueChange}
                onValueCommit={handlePriceCommit}
                disabled={isPending}
                className={cn(isPending && "opacity-50")}
                aria-label={`Price range from ${priceFmt(localPriceRange[0])} to ${priceFmt(localPriceRange[1])}`}
              />

              {/* Min/Max Labels */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{priceFmt(0)}</span>
                <span>{priceFmt(MAX_PRICE)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Loading Indicator */}
      {isPending && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Applying filters...</span>
        </div>
      )}
    </aside>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

export { FilterSidebar };
export type { FilterSidebarProps };