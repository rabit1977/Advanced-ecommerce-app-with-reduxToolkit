'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps {
  product: Product;
}

export function ProductImageCarousel({ product }: ProductImageCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Get all available images
  const images = useMemo(() => {
    const productImages = product.images || [];
    const variantImages = product.options?.[0]?.variants
      ?.map((v) => v.image)
      .filter(Boolean) || [];
    
    const allImages = [...productImages, ...variantImages];
    return allImages.length > 0 ? allImages : ['/images/placeholder.jpg'];
  }, [product.images, product.options]);

  const currentImage = images[activeImageIndex];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsImageLoaded(false);
  }, [images.length]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsImageLoaded(false);
  }, [images.length]);

  const handleDotClick = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex(index);
    setIsImageLoaded(false);
  }, []);

  // Check stock status
  const stockStatus = useMemo(() => {
    if (product.stock === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (product.stock < 10) return { label: `Only ${product.stock} left`, variant: 'secondary' as const };
    return null;
  }, [product.stock]);

  return (
    <div className="relative aspect-square h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-600">
      {/* Main Image */}
      <Link href={`/products/${product.id}`} className="relative block h-full w-full">
        <Image
          src={currentImage as string}
          alt={`${product.title} - Image ${activeImageIndex + 1}`}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            isImageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            'group-hover:scale-105'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsImageLoaded(true)}
          priority={activeImageIndex === 0}
        />
      </Link>

      {/* Stock Status Badge */}
      {stockStatus && (
        <Badge 
          variant={stockStatus.variant}
          className="absolute top-3 left-3 z-10 shadow-md"
        >
          {stockStatus.label}
        </Badge>
      )}

      {/* Navigation Arrows - Only show if multiple images */}
      {/* {hasMultipleImages && (
        <div className="absolute inset-0 flex items-center justify-between p-2 px-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-lg backdrop-blur-sm"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-lg backdrop-blur-sm"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )} */}

      {/* Dot Indicators */}
      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(e, index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                'h-1.5 rounded-full cursor-pointer transition-all duration-300',
                activeImageIndex === index
                  ? 'w-6 bg-white shadow-md'
                  : 'w-1.5 bg-white/60 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {hasMultipleImages && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="text-xs backdrop-blur-sm">
            {activeImageIndex + 1} / {images.length}
          </Badge>
        </div>
      )}
    </div>
  );
}