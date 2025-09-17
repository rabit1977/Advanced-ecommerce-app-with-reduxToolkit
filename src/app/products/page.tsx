'use client';

import { ProductGrid } from '@/components/product/product-grid';
import { useUI } from '@/lib/hooks/useUI';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ProductsPage = () => {
  const { setSearchQuery } = useUI();
  const searchParams = useSearchParams();

  // Get search query from URL on component mount
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []); // Empty dependency array since searchParams and setSearchQuery are stable

  return (
    <ProductGrid
      title='All Products'
      subtitle='Browse our complete collection'
    />
  );
};

export default ProductsPage;
