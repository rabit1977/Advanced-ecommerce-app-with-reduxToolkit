'use client';

import { Button } from '@/components/ui/button';
import { Stars } from '@/components/ui/stars';
import { useCart } from '@/lib/hooks/useCart';
import { useUI } from '@/lib/hooks/useUI';
import { Product } from '@/lib/types';
import { priceFmt } from '@/lib/utils/formatters';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useMemo, useTransition } from 'react';
import { ProductImageCarousel } from './product-image-carousel';

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(({ product }: ProductCardProps) => {
  // We now get the wishlist and toggle function directly from your client-side context
  const { setQuickViewProductId } = useUI();
  const { wishlistItems, toggleWishlist } = useCart();
  const [isPending, startTransition] = useTransition();

  // The source of truth is the client-side wishlist Set from your context
  const isWished = useMemo(
    () => wishlistItems.includes(product.id),
    [wishlistItems, product.id]
  );
  const isOutOfStock = useMemo(() => product.stock === 0, [product.stock]);

  const handleQuickViewClick = useCallback(() => {
    setQuickViewProductId(product.id);
  }, [product.id, setQuickViewProductId]);

  // This handler now uses useTransition for a non-blocking UI update
  const handleToggleWishlist = useCallback(() => {
    startTransition(() => {
      // This state update is marked as a transition. React will keep the UI
      // responsive while this runs in the background.
      toggleWishlist(product.id);
    });
  }, [product.id, toggleWishlist]);

  return (
    <motion.div
      layoutId={`product-card-${product.id}`}
      // whileHover={{ y: -5 }}
      className='w-full'
    >
      <div className='group relative w-full overflow-hidden rounded-2xl border bg-white shadow-md transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 '>
        <ProductImageCarousel product={product} />

        {isOutOfStock && (
          <div className='pointer-events-none absolute inset-0 top-0 flex h-48 items-center justify-center bg-black/50'>
            <span className='font-bold uppercase tracking-widest text-white'>
              Out of Stock
            </span>
          </div>
        )}

        <div className='absolute right-2 top-2 flex gap-2 '>
          <Button
            size='icon'
            variant='secondary'
            className='h-8 w-8 rounded-full shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            onClick={handleQuickViewClick}
            aria-label='Quick view'
          >
            <Eye className='h-4 w-4' />
          </Button>
          <Button
            size='icon'
            variant={isWished ? 'default' : 'secondary'}
            className='h-8 w-8 rounded-full shadow-md'
            onClick={handleToggleWishlist}
            disabled={isPending} // Disable the button while the transition is pending
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-4 w-4 ${isWished ? 'fill-red-500 stroke-0' : ''}`}
            />
          </Button>
        </div>

        <Link href={`/products/${product.id}`} className='block p-4'>
          <div className='text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400'>
            {product.brand}
          </div>
          <h3 className='truncate text-lg font-semibold leading-tight text-slate-900 dark:text-white'>
            {product.title}
          </h3>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xl font-bold text-slate-900 dark:text-white'>
              {priceFmt(product.price)}
            </span>
            <div className='flex items-center gap-1'>
              <Stars value={product.rating} />
              <span className='text-xs text-slate-500 dark:text-slate-400'>
                ({product.reviewCount})
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export { ProductCard };
