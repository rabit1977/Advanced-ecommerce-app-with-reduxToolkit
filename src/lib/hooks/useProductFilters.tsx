import { useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export const useProductFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (params: Record<string, string | number | null | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined || value === '') {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const navigateWithTransition = useCallback(
    (queryString: string, scrollToTop = false, gridRef?: React.RefObject<HTMLDivElement>) => {
      startTransition(() => {
        router.push(`${pathname}?${queryString}`, { scroll: false });

        if (scrollToTop && gridRef?.current) {
          setTimeout(() => {
            gridRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 100);
        }
      });
    },
    [router, pathname]
  );

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      const queryString = createQueryString({
        category: newCategory === 'all' ? null : newCategory,
        page: 1,
      });
      navigateWithTransition(queryString);
    },
    [createQueryString, navigateWithTransition]
  );

  const handleBrandsChange = useCallback(
    (newBrands: string[]) => {
      const brandsStr = newBrands.length > 0 ? newBrands.join(',') : null;
      const queryString = createQueryString({ brands: brandsStr, page: 1 });
      navigateWithTransition(queryString);
    },
    [createQueryString, navigateWithTransition]
  );

  const handlePriceChange = useCallback(
    (newPriceRange: [number, number]) => {
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current);
      }

      priceTimeoutRef.current = setTimeout(() => {
        const [min, max] = newPriceRange;
        const queryString = createQueryString({
          minPrice: min === 0 ? null : min,
          maxPrice: max === 1000 ? null : max,
          page: 1,
        });
        navigateWithTransition(queryString);
      }, 500);
    },
    [createQueryString, navigateWithTransition]
  );

  const handleSortChange = useCallback(
    (newSort: string) => {
      const queryString = createQueryString({
        sort: newSort === 'featured' ? null : newSort,
        page: 1,
      });
      navigateWithTransition(queryString);
    },
    [createQueryString, navigateWithTransition]
  );

  const handlePageChange = useCallback(
    (newPage: number, gridRef?: React.RefObject<HTMLDivElement>) => {
      const queryString = createQueryString({ page: newPage });
      navigateWithTransition(queryString, true, gridRef);
    },
    [createQueryString, navigateWithTransition]
  );

  const handleClearFilters = useCallback(() => {
    const queryString = createQueryString({
      category: null,
      brands: null,
      minPrice: null,
      maxPrice: null,
      page: 1,
    });
    navigateWithTransition(queryString);
  }, [createQueryString, navigateWithTransition]);

  return {
    isPending,
    priceTimeoutRef,
    handleCategoryChange,
    handleBrandsChange,
    handlePriceChange,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
  };
};
