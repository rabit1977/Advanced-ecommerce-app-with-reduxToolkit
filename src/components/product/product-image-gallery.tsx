'use client';

import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

interface ProductImageGalleryProps {
  product: Product;
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, value: string) => void;
}

export function ProductImageGallery({
  product,
  selectedOptions,
  onOptionChange,
}: ProductImageGalleryProps) {
  // Logic to determine the active image is now contained here.
  const activeImage = useMemo(() => {
    const colorOption = product.options?.find((opt) => opt.type === 'color');
    if (colorOption) {
      const selectedColor = selectedOptions[colorOption.name];
      const selectedVariant = colorOption.variants.find(
        (v) => v.value === selectedColor
      );
      return (
        selectedVariant?.image ||
        product.images?.[0] ||
        '/images/placeholder.jpg'
      );
    }
    return product.images?.[0] || '/images/placeholder.jpg';
  }, [product, selectedOptions]);

  // Logic for thumbnail selection is also self-contained.
  const thumbnailVariants = useMemo(() => {
    const colorOption = product.options?.find((opt) => opt.type === 'color');
    return colorOption?.variants || [];
  }, [product.options]);

  return (
    <motion.div layoutId={`product-card-${product.id}`}>
      <div className="h-80 w-full overflow-hidden rounded-xl border dark:border-slate-800 sm:h-[400px] ">
        <Image
          src={activeImage}
          alt={product.title}
          width={500}
          height={400}
          className="h-full w-full object-cover "
          priority // Prioritize loading the main product image
        />
      </div>
      {thumbnailVariants.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4 ">
          {thumbnailVariants.map((variant) => (
            <button
              key={variant.value}
              onClick={() =>
                onOptionChange(product.options![0].name, variant.value)
              }
              className={cn(
                'overflow-hidden rounded-lg border transition-all duration-200 dark:border-slate-800',
                selectedOptions[product.options![0].name] === variant.value
                  ? 'ring-2 ring-slate-900 ring-offset-2 dark:ring-slate-50'
                  : 'opacity-70 hover:opacity-100'
              )}
              aria-label={`Select ${variant.name} color`}
            >
              <Image
                src={
                  variant.image ||
                  product.images?.[0] ||
                  '/images/placeholder.jpg'
                }
                alt={variant.name}
                width={96}
                height={96}
                className="h-20 w-full object-cover sm:h-24"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}