'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { priceFmt } from '@/lib/utils/formatters';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MAX_PRICE = 1000; // In a real app, you'd get this from the product data

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  currentCategory: string;
  currentBrands: string;
  currentMinPrice?: number;
  currentMaxPrice?: number;
  onCategoryChange: (category: string) => void;
  onBrandsChange: (brands: string[]) => void;
  onPriceChange: (priceRange: [number, number]) => void;
}

const FilterSidebar = ({
  categories,
  brands,
  currentCategory,
  currentBrands,
  currentMinPrice = 0,
  currentMaxPrice = MAX_PRICE,
  onCategoryChange,
  onBrandsChange,
  onPriceChange,
}: FilterSidebarProps) => {
  const [localPriceRange, setLocalPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);

  useEffect(() => {
    setLocalPriceRange([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

  const selectedBrands = useMemo(
    () => new Set(currentBrands ? currentBrands.split(',') : []),
    [currentBrands]
  );

  const handleBrandSelect = (brand: string) => {
    const newSelectedBrands = new Set(selectedBrands);
    if (newSelectedBrands.has(brand)) {
      newSelectedBrands.delete(brand);
    } else {
      newSelectedBrands.add(brand);
    }
    onBrandsChange(Array.from(newSelectedBrands));
  };

  return (
    <aside className="w-full">
      <Accordion type="multiple" defaultValue={['category', 'brands', 'price']} className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 pt-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={currentCategory === c ? 'default' : 'ghost'}
                  onClick={() => onCategoryChange(c)}
                  className="justify-start"
                >
                  {c === 'all' ? 'All Categories' : c}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-lg font-medium">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 pt-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.has(brand)}
                    onChange={() => handleBrandSelect(brand)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm text-slate-700 dark:text-slate-300">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-medium">Price</AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{priceFmt(localPriceRange[0])}</span>
              <span>{priceFmt(localPriceRange[1])}</span>
            </div>
            <Slider
              min={0}
              max={MAX_PRICE}
              step={10}
              value={localPriceRange}
              onValueChange={setLocalPriceRange}
              onValueCommit={onPriceChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export { FilterSidebar };
