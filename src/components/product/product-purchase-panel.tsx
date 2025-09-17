'use client';

import { Button } from '@/components/ui/button';
import { Stars } from '@/components/ui/stars';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addToCart, toggleWishlist } from '@/lib/store/thunks/cartThunks';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { priceFmt } from '@/lib/utils/formatters';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react';
import { useCallback, useMemo, useState, useTransition } from 'react';

interface ProductPurchasePanelProps {
  product: Product;
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, optionValue: string) => void;
}

export function ProductPurchasePanel({
  product,
  selectedOptions,
  onOptionChange,
}: ProductPurchasePanelProps) {
  const dispatch = useAppDispatch();
  const { itemIds: wishlistItems } = useAppSelector((state: any) => state.wishlist);
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const isWished = useMemo(
    () => wishlistItems.includes(product.id),
    [wishlistItems, product.id]
  );
  const isOutOfStock = useMemo(() => product.stock === 0, [product.stock]);

  const handleAddToCart = useCallback(() => {
    startTransition(() => {
      dispatch(addToCart({
        id: product.id,
        quantity,
        title: product.title,
        price: product.price,
        options: selectedOptions,
      }));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    });
  }, [product, quantity, selectedOptions, dispatch]);

  return (
    <div>
      <div className='text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400'>
        {product.brand}
      </div>
      <h1 className='mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl'>
        {product.title}
      </h1>

      <div className='mt-4 flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Stars value={product.rating} />
          <span className='text-sm text-slate-600 dark:text-slate-400'>
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className='mt-6 flex items-baseline gap-3'>
        <span className='text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl'>
          {priceFmt(product.price)}
        </span>
      </div>

      <div className='mt-4'>
        {isOutOfStock ? (
          <p className='font-semibold text-red-500'>Out of Stock</p>
        ) : (
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            In stock: {product.stock} items
          </p>
        )}
      </div>

      <p className='mt-6 leading-relaxed text-slate-600 dark:text-slate-300'>
        {product.description}
      </p>

      {product.options && product.options.length > 0 && (
        <div className='mt-6 space-y-4'>
          {product.options.map((option) => (
            <div key={option.name}>
              <h3 className='text-sm font-medium dark:text-white'>
                {option.name}
              </h3>
              <div className='mt-2 flex flex-wrap gap-2'>
                {option.variants.map((variant) => (
                  <button
                    key={variant.value}
                    type='button'
                    onClick={() => onOptionChange(option.name, variant.value)}
                    className={cn(
                      'relative flex items-center justify-center rounded-md p-0.5',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2',
                      selectedOptions[option.name] === variant.value
                        ? 'ring-slate-900 dark:ring-slate-50'
                        : 'ring-transparent',
                      option.type === 'color'
                        ? 'h-8 w-8'
                        : 'h-10 border border-slate-200 px-4 text-sm font-medium dark:border-slate-700'
                    )}
                  >
                    {option.type === 'color' && (
                      <span
                        className='block h-full w-full rounded-md border border-gray-200'
                        style={{ backgroundColor: variant.value }}
                        title={variant.name}
                      />
                    )}
                    {option.type === 'size' && (
                      <span className='text-slate-900 dark:text-white'>
                        {variant.name}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='mt-8 flex flex-col items-center gap-4 sm:flex-row'>
        <div className='flex items-center rounded-md border dark:border-slate-700'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label='Decrease quantity'
          >
            <Minus className='h-4 w-4' />
          </Button>
          <span className='w-8 text-center dark:text-white'>{quantity}</span>
          <Button
            variant='ghost'
            size='icon'
            // ✅ FIX 1: Cap the quantity at the available stock
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            // ✅ FIX 2: Disable the button when the max stock is reached
            disabled={quantity >= product.stock}
            aria-label='Increase quantity'
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>

        <Button
          className='w-full sm:w-auto sm:flex-1'
          onClick={handleAddToCart}
          disabled={isOutOfStock || isPending}
        >
          <AnimatePresence mode='wait' initial={false}>
            <motion.span
              key={addedToCart ? 'added' : isPending ? 'adding' : 'add'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='flex items-center justify-center gap-2'
            >
              {addedToCart ? (
                <>
                  <Check className='h-5 w-5 text-green-400' /> Added!
                </>
              ) : isPending ? (
                <>
                  <RotateCcw className='h-5 w-5 animate-spin' /> Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className='h-5 w-5' />{' '}
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </Button>

        <Button
          variant={isWished ? 'secondary' : 'outline'}
          size='lg'
          onClick={() => dispatch(toggleWishlist(product.id))}
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          className='w-full sm:w-auto'
        >
          <Heart
            className={cn(
              'h-6 w-6 transition-colors',
              isWished ? 'fill-red-500 text-red-500' : ''
            )}
          />
        </Button>
      </div>
    </div>
  );
}
