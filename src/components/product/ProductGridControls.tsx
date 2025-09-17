// components/product/product-grid-controls.tsx
'use client';

import { ChevronDown } from 'lucide-react';
import React, { useMemo } from 'react';
import { Product } from '@/lib/types';
import { SortKey } from './product-grid';

interface ProductGridControlsProps {
  title: string;
  subtitle: string;
  categories: string[];
  currentCategory: string;
  currentSort: SortKey;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const ProductGridControls = ({
  title,
  subtitle,
  categories,
  currentCategory,
  currentSort,
  onCategoryChange,
  onSortChange,
}: ProductGridControlsProps) => {
  const sortOptions = useMemo(() => ([
    { value: 'featured', label: 'Sort: Featured' },
    { value: 'price-asc', label: 'Sort: Price Low to High' },
    { value: 'price-desc', label: 'Sort: Price High to Low' },
    { value: 'rating', label: 'Sort: Highest Rated' },
    { value: 'newest', label: 'Sort: Newest' },
  ]), []);
  
  return (
    <div className='md:flex md:items-center md:justify-between'>
      <div>
        <h2 className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
          {title}
        </h2>
        <p className='mt-2 text-lg text-slate-600 dark:text-slate-300'>
          {subtitle}
        </p>
      </div>
      <div className='mt-4 flex flex-col gap-4 sm:flex-row md:mt-0'>
        {/* Category Filter */}
        <div className='relative'>
          <select
            value={currentCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className='w-full cursor-pointer appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-auto'
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
          <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
        </div>
        {/* Sort Dropdown */}
        <div className='relative'>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className='w-full cursor-pointer appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:w-auto'
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
        </div>
      </div>
    </div>
  );
};

export { ProductGridControls };