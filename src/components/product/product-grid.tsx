// components/product/product-grid.tsx
'use client';

import { useProducts } from '@/lib/hooks/useProducts';
import { Product } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { ProductGridControls } from './ProductGridControls';
import { ProductGridPagination } from './ProductGridPagination';
import { ProductList } from './ProductList';

// --- Configuration ---
const PRODUCTS_PER_PAGE = 8;

// --- Sorting Logic Map (Declarative and Extensible) ---
const sortOptions = {
  featured: (a: Product, b: Product) => 0,
  'price-asc': (a: Product, b: Product) => a.price - b.price,
  'price-desc': (a: Product, b: Product) => b.price - a.price,
  rating: (a: Product, b: Product) => (b.rating || 0) - (a.rating || 0),
  newest: (a: Product, b: Product) => b.id.localeCompare(a.id),
};

export type SortKey = keyof typeof sortOptions;

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

const ProductGrid = ({
  title = 'All Products',
  subtitle = 'Find the perfect tech for you',
  products: customProducts,
}: ProductGridProps) => {
  const { products: contextProducts } = useProducts();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null); // Create the ref

  const products = customProducts || contextProducts;
  const searchQuery = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = (searchParams.get('sort') as SortKey) || 'featured';
  const currentPage = Number(searchParams.get('page')) || 1;

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (newCategory: string) => {
    router.push(
      `${pathname}?${createQueryString({ category: newCategory, page: 1 })}`,
      { scroll: false }
    );
  };

  const handleSortChange = (newSort: string) => {
    router.push(
      `${pathname}?${createQueryString({ sort: newSort, page: 1 })}`,
      { scroll: false }
    );
  };

  const handlePageChange = (newPage: number | string) => {
    if (typeof newPage === 'number') {
      // 1. Push the new URL with scroll: false
      router.push(`${pathname}?${createQueryString({ page: newPage })}`, {
        scroll: false,
      });

      // 2. Wait for a short time to allow the page content to update,
      //    then scroll to the grid
      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50); // A small delay is often necessary
    }
  };

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowercasedQuery) ||
          p.brand.toLowerCase().includes(lowercasedQuery) ||
          p.category.toLowerCase().includes(lowercasedQuery)
      );
    }
    if (currentCategory !== 'all') {
      result = result.filter((p) => p.category === currentCategory);
    }
    result.sort(sortOptions[currentSort]);
    return result;
  }, [products, searchQuery, currentCategory, currentSort]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  const totalProductsCount = filteredAndSortedProducts.length;
  const currentTitle = searchQuery ? `Results for "${searchQuery}"` : title;
  const currentSubtitle = searchQuery
    ? `${totalProductsCount} product(s) found`
    : subtitle;

  return (
    <div className='bg-slate-50 dark:bg-slate-900'>
      <div className='container mx-auto px-4 py-16' ref={gridRef}>
        <ProductGridControls
          title={currentTitle}
          subtitle={currentSubtitle}
          categories={categories}
          currentCategory={currentCategory}
          currentSort={currentSort}
          onCategoryChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <ProductList products={paginatedProducts} />
        <ProductGridPagination
          currentPage={currentPage}
          totalCount={totalProductsCount}
          pageSize={PRODUCTS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export { ProductGrid };
