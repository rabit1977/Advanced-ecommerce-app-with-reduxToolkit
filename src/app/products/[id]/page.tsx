'use client';

import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductPurchasePanel } from '@/components/product/product-purchase-panel';
import { RelatedProducts } from '@/components/product/related-products';
import { ReviewsSection } from '@/components/product/reviews-section';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/lib/hooks/useProducts';
import { Product } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

// Helper function to initialize state safely
const getDefaultOptions = (product: Product | undefined) => {
  if (!product?.options) return {};
  return product.options.reduce(
    (acc, opt) => ({
      ...acc,
      [opt.name]: opt.variants[0]?.value || '',
    }),
    {}
  );
};

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { products } = useProducts();
  const product = useMemo(
    () => products.find((p) => p.id === params.id),
    [products, params.id]
  );

  // --- LIFTED STATE ---
  // The parent page now owns the state for selected options
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => getDefaultOptions(product));

  // It also owns the function to update the state
  const handleOptionChange = useCallback(
    (optionName: string, optionValue: string) => {
      setSelectedOptions((prev) => ({ ...prev, [optionName]: optionValue }));
    },
    []
  );

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <p className='text-lg'>Product not found.</p>
        <Button variant='link' onClick={() => router.push('/products')}>
          Go back to all products
        </Button>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-slate-950'>
      <div className='container mx-auto px-4 py-12'>
        <Button
          variant='ghost'
          onClick={() => router.push('/products')}
          className='mb-6'
        >
          <ChevronLeft className='mr-2 h-4 w-4' />
          Back to Products
        </Button>

        <div className='grid gap-8 md:grid-cols-2 md:gap-12'>
          {/* Pass the state and function down to the children */}
          <ProductImageGallery
            product={product}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
          <ProductPurchasePanel
            product={product}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        <ReviewsSection
          productId={product.id}
          reviews={product.reviews || []}
        />
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
