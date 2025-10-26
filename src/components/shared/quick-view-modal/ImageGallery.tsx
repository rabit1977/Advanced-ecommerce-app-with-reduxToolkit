import { ImageGalleryProps } from '@/lib/types/quickview';
import { cn } from '@/lib/utils';
import { getSafeImageUrl } from '@/lib/utils/quickview';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';

export const ImageGallery = ({
  images,
  activeImage,
  onImageChange,
  productTitle,
}: ImageGalleryProps) => {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Get all unique images (remove duplicates)
  const allImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    const uniqueImages = Array.from(
      new Set(images.map((img) => getSafeImageUrl(img)))
    );
    return uniqueImages;
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  return (
    <div className='space-y-4'>
      <div
        ref={imageContainerRef}
        className='relative h-64 md:h-80 overflow-hidden rounded-lg bg-muted cursor-crosshair'
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <Image
          src={getSafeImageUrl(activeImage)}
          alt={productTitle}
          fill
          className='object-cover'
          priority
        />

        {/* Zoom Overlay - Shows on hover */}
        {showZoom && (
          <div className='absolute inset-0 pointer-events-none'>
            {/* Zoomed Image */}
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `url(${getSafeImageUrl(activeImage)})`,
                backgroundSize: '250%',
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />

            {/* Lens indicator (small box showing zoom area) */}
            <div
              className='absolute w-20 h-20 border-2 border-white/50 rounded-full pointer-events-none'
              style={{
                left: `calc(${zoomPosition.x}% - 2.5rem)`,
                top: `calc(${zoomPosition.y}% - 2.5rem)`,
              }}
            />
          </div>
        )}
      </div>

      {allImages.length > 0 && (
        <div className='grid grid-cols-4 gap-2'>
          {allImages.map((img, i) => {
            const isActive = activeImage === img;

            return (
              <button
                key={i}
                onClick={() => onImageChange(img)}
                className={cn(
                  'h-16 overflow-hidden rounded-md border-2 transition-all hover:border-primary',
                  isActive
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : 'border-muted'
                )}
              >
                <Image
                  src={img}
                  alt={`${productTitle} view ${i + 1}`}
                  width={64}
                  height={64}
                  className='h-full w-full object-cover'
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
