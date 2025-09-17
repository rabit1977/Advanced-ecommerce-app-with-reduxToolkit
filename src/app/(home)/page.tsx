'use client';

import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/product/product-grid';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { increment, decrement } from '@/lib/store/counterSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
 

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
