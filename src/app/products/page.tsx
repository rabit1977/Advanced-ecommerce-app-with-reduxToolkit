'use client';

import { ProductGrid } from '@/components/product/product-grid';
import { LoadingOverlay } from '@/components/shared/LoadingOverlay';
import { getBrands, getCategories, getProducts } from '@/lib/data/get-products';
import { Product, SortKey } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProductsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const params = searchParams || {};

      // Parse and validate search params
      const query = (params?.get('search') as string) || '';
      const categories = (params?.get('categories') as string) || '';
      const brands = (params?.get('brands') as string) || '';
      const minPrice = Number(params?.get('minPrice')) || undefined;
      const maxPrice = Number(params?.get('maxPrice')) || undefined;
      const sort = (params?.get('sort') as SortKey) || 'featured';
      const page = Number(params?.get('page')) || 1;

      // Fetch all data in parallel
      const [{ products, totalCount }, allCategories, allBrands] =
        await Promise.all([
          getProducts({
            query,
            categories,
            brands,
            minPrice,
            maxPrice,
            sort,
            page,
            limit: 8,
          }),
          getCategories(),
          getBrands(),
        ]);

      setProducts(products);
      setTotalCount(totalCount);
      setAllCategories(allCategories);
      setAllBrands(allBrands);
      setIsLoading(false);
    };

    fetchProducts();
  }, [searchParams]);

  const params = searchParams || {};
  const query = (params?.get('search') as string) || '';
  const categories = (params?.get('categories') as string) || '';
  const brands = (params?.get('brands') as string) || '';
  const minPrice = Number(params?.get('minPrice')) || undefined;
  const maxPrice = Number(params?.get('maxPrice')) || undefined;
  const sort = (params?.get('sort') as SortKey) || 'featured';
  const page = Number(params?.get('page')) || 1;

  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

  return (
    <ProductGrid
      products={products}
      totalCount={totalCount}
      currentPage={page}
      currentCategories={categories}
      currentBrands={brands}
      currentMinPrice={minPrice}
      currentMaxPrice={maxPrice}
      currentSort={sort}
      allCategories={allCategories}
      allBrands={allBrands}
      searchQuery={query}
    />
  );
};

export default ProductsPage;
