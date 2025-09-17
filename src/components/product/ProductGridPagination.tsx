// components/product/product-grid-pagination.tsx
'use client';

import { usePagination, DOTS } from '@/lib/hooks/usePagination';
import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridPaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number | string) => void;
}

const ProductGridPagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: ProductGridPaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  const lastPage = paginationRange[paginationRange.length - 1];
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='mt-12 flex justify-center'>
      <nav className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label='Go to previous page'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        {paginationRange.map((page, index) =>
          page === DOTS ? (
            <span
              key={`dots-${index}`}
              className='flex h-9 w-9 items-center justify-center'
            >
              &#8230;
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size='icon'
              onClick={() => onPageChange(page as number)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          )
        )}
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          aria-label='Go to next page'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </nav>
    </div>
  );
};

export { ProductGridPagination };