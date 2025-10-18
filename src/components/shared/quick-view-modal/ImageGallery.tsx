import { Button } from '@/components/ui/button';
import { ImageGalleryProps } from '@/lib/types/quickview';
import { cn } from '@/lib/utils';
import { getSafeImageUrl } from '@/lib/utils/quickview';
import { ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const ImageGallery = ({
  images,
  activeImage,
  onImageChange,
  productTitle,
}: ImageGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='relative h-64 md:h-80 overflow-hidden rounded-lg bg-muted group'>
        <Image
          src={getSafeImageUrl(activeImage)}
          alt={productTitle}
          fill
          className={cn(
            'object-cover transition-transform duration-300',
            isZoomed && 'scale-150 cursor-zoom-out',
            !isZoomed && 'cursor-zoom-in'
          )}
          onClick={() => setIsZoomed(!isZoomed)}
          priority
        />

        {/* Zoom indicator */}
        <Button
          variant='secondary'
          size='icon'
          className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          {isZoomed ? (
            <ZoomOut className='h-4 w-4' />
          ) : (
            <ZoomIn className='h-4 w-4' />
          )}
        </Button>
      </div>

      {images && images.length > 1 && (
        <div className='grid grid-cols-4 gap-2'>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                onImageChange(getSafeImageUrl(img));
                setIsZoomed(false);
              }}
              className={cn(
                'h-16 overflow-hidden rounded-md border-2 transition-all hover:border-primary',
                activeImage === getSafeImageUrl(img)
                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                  : 'border-muted'
              )}
            >
              <Image
                src={getSafeImageUrl(img)}
                alt={`${productTitle} view ${i + 1}`}
                width={64}
                height={64}
                className='h-full w-full object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
