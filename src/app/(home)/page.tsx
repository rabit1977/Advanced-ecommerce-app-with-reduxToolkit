'use client';

import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/product/product-grid';

export default function HomePage() {

  return (
    <>
      <Hero />
      <ProductGrid
        title='Featured Products'
        subtitle='Check out our latest and greatest'
      />
    </>
  );
}
