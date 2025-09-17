'use client';

import { Product, ProductImageCarouselProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';



export function ProductImageCarousel({ product }: ProductImageCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = useMemo(() => {
    return product.images || product.options?.[0]?.variants?.map((v) => v.image) || [];
  }, [product.images, product.options]);

  const displayImage = useMemo(() => {
    const primaryImage = product.options?.[0]?.variants?.[0]?.image || product.images?.[0] || '/images/placeholder.jpg';
    return displayImages[activeImageIndex] || primaryImage;
  }, [displayImages, activeImageIndex, product.images, product.options]);

  const imageCount = displayImages.length;

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  }, [imageCount]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  }, [imageCount]);

  return (
    <div className='relative h-48 w-full overflow-hidden'>
      <Link href={`/products/${product.id}`} className='block h-full w-full'>
        <Image src={displayImage} alt={product.title} fill className='object-cover transition-transform duration-300 hover:scale-110' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
      </Link>
      {imageCount > 1 && (
        <>
          <div className='absolute inset-0 flex items-center justify-between'>
            <Button size='icon' variant='secondary' className='ml-2 h-8 w-8 rounded-full shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100' onClick={handlePrevImage} aria-label='Previous image'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button size='icon' variant='secondary' className='mr-2 h-8 w-8 rounded-full shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100' onClick={handleNextImage} aria-label='Next image'>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
          <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5'>
            {displayImages.map((_, index) => (
              <button key={index} onClick={() => setActiveImageIndex(index)} aria-label={`Go to image ${index + 1}`} className={`h-1.5 w-1.5 rounded-full transition-all duration-300', ${activeImageIndex === index ? 'scale-125 bg-white ring-1 ring-slate-500' : 'bg-white/60'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}