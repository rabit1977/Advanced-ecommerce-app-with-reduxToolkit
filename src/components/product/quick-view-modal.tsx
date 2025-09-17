'use client';

import { Button } from '@/components/ui/button';
import { Stars } from '@/components/ui/stars';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { setQuickViewProductId } from '@/lib/store/slices/uiSlice';
import { toggleWishlist } from '@/lib/store/thunks/cartThunks';
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
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const QuickViewModal = () => {
  const dispatch = useAppDispatch();
  const { quickViewProductId } = useAppSelector((state) => state.ui);
  const { products } = useAppSelector((state) => state.products);
  const { ids: wishlist } = useAppSelector((state) => state.wishlist);

  const product = products.find((p) => p.id === quickViewProductId);

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [activeImage, setActiveImage] = useState<string>('');

  // Get a safe image URL - fallback to placeholder if empty
  const getSafeImageUrl = (url: string | undefined): string => {
    if (!url || url === '') {
      return '/images/placeholder.jpg';
    }
    return url;
  };

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdding(false);
      setAdded(false);
      const initialOptions = product.options?.reduce(
        (acc, opt) => ({
          ...acc,
          [opt.name]: opt.variants[0]?.value || '',
        }),
        {}
      );
      setSelectedOptions(initialOptions || {});

      // Set initial active image safely
      const primaryImage = getSafeImageUrl(
        product.options?.[0]?.variants?.[0]?.image || product.images?.[0]
      );
      setActiveImage(primaryImage);
    }
  }, [product]);

  if (!product) return null;

  const isWished = wishlist?.includes(product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = async () => {
    setAdding(true);
    await new Promise((r) => setTimeout(r, 900));
    const cartItemId = `${product.id}-${JSON.stringify(selectedOptions)}`;
    const colorOption = product.options?.find((o) => o.name === 'Color');
    const selectedVariant = colorOption?.variants.find(
      (v) => v.value === selectedOptions?.Color
    );
    const itemImage =
      selectedVariant?.image ||
      product.images?.[0] ||
      '/images/placeholder.jpg';

    dispatch(
      addToCart({
        id: product.id,
        quantity,
        title: product.title,
        price: product.price,
        options: selectedOptions,
        cartItemId,
        image: itemImage,
      })
    );
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: optionValue }));
    if (optionName === 'Color' && product.options?.[0]?.type === 'color') {
      const selectedVariant = product.options[0].variants.find(
        (v) => v.value === optionValue
      );
      const newImage = getSafeImageUrl(
        selectedVariant?.image || product.images?.[0]
      );
      setActiveImage(newImage);
    }
  };

  return (
    <AnimatePresence>
      {quickViewProductId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60'
          onClick={() => dispatch(setQuickViewProductId(null))}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto dark:bg-slate-900'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute top-4 right-4 p-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
              onClick={() => dispatch(setQuickViewProductId(null))}
            >
              <X className='h-5 w-5' />
            </button>

            <div className='grid md:grid-cols-2 gap-8 p-6'>
              <div>
                <div className='h-64 md:h-80 overflow-hidden rounded-lg'>
                  <Image
                    src={getSafeImageUrl(activeImage)}
                    alt={product.title}
                    width={400}
                    height={320}
                    className='h-full w-full object-cover'
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className='mt-4 grid grid-cols-4 gap-2'>
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(getSafeImageUrl(img))}
                        className={cn(
                          'h-16 overflow-hidden rounded-md border',
                          activeImage === img
                            ? 'border-slate-900 ring-2 ring-slate-900 ring-offset-2 dark:border-slate-50 dark:ring-slate-50'
                            : 'border-slate-200 dark:border-slate-700'
                        )}
                      >
                        <Image
                          src={getSafeImageUrl(img)}
                          alt={`Thumbnail ${i + 1}`}
                          width={64}
                          height={64}
                          className='h-full w-full object-cover'
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                  {product.title}
                </h2>
                <p className='text-sm text-slate-500 dark:text-slate-400 mt-1'>
                  {product.brand}
                </p>

                <div className='mt-4 flex items-center gap-2'>
                  <Stars value={product.rating} />
                  <span className='text-sm text-slate-600 dark:text-slate-300'>
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <p className='mt-4 text-2xl font-bold text-slate-900 dark:text-white'>
                  {priceFmt(product.price)}
                </p>

                <div className='mt-4'>
                  {isOutOfStock ? (
                    <p className='font-semibold text-red-500'>Out of Stock</p>
                  ) : (
                    <p className='text-sm text-slate-600 dark:text-slate-400'>
                      In stock: {product.stock} items
                    </p>
                  )}
                </div>

                <p className='mt-4 text-slate-600 dark:text-slate-300'>
                  {product.description}
                </p>

                {product.options && (
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
                              onClick={() =>
                                handleOptionChange(option.name, variant.value)
                              }
                              className={cn(
                                'relative flex items-center justify-center rounded-md p-0.5',
                                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                                selectedOptions[option.name] === variant.value
                                  ? 'ring-slate-900 dark:ring-slate-50'
                                  : 'ring-transparent',
                                option.type === 'color'
                                  ? 'h-8 w-8'
                                  : 'h-10 px-4 text-sm font-medium border border-slate-200 dark:border-slate-700'
                              )}
                            >
                              {option.type === 'color' && (
                                <span
                                  className='h-full w-full rounded-md border border-gray-200 block'
                                  style={{ backgroundColor: variant.value }}
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

                <div className='mt-6 flex items-center gap-4'>
                  <div className='flex items-center border rounded-md dark:border-slate-700'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <span className='w-8 text-center dark:text-white'>
                      {quantity}
                    </span>
                    <Button
                      variant='ghost'
                      size='icon'
                      // ✅ FIX 1: Cap the quantity at the available stock
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      // ✅ FIX 2: Disable the button when the max stock is reached
                      disabled={quantity >= product.stock}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>

                  <Button
                    variant={isWished ? 'secondary' : 'outline'}
                    size='icon'
                    onClick={() => dispatch(toggleWishlist(product.id))}
                    aria-label='Wishlist'
                  >
                    <Heart
                      className={cn(
                        'h-5 w-5',
                        isWished ? 'fill-red-500 text-red-500' : ''
                      )}
                    />
                  </Button>
                </div>

                <Button
                  className='w-full mt-6'
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || adding}
                >
                  <motion.span
                    key={added ? 'added' : adding ? 'adding' : 'add'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='flex items-center justify-center gap-2'
                  >
                    {added ? (
                      <>
                        <Check className='h-5 w-5 text-green-400' />
                        Added!
                      </>
                    ) : adding ? (
                      <>
                        <RotateCcw className='h-5 w-5 animate-spin' />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className='h-5 w-5 cursor-pointer' />
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                      </>
                    )}
                  </motion.span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { QuickViewModal };
