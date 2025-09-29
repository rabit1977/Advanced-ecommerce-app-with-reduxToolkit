'use client';

import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductPurchasePanel } from '@/components/product/product-purchase-panel';
import { RelatedProducts } from '@/components/product/related-products';
import { ReviewsSection } from '@/components/product/reviews-section';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useProducts } from '@/lib/hooks/useProducts';
import { Product } from '@/lib/types';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';
/**
 * Initialize default selected options from product
 */
const getDefaultOptions = (
  product: Product | undefined
): Record<string, string> => {
  if (!product?.options || product.options.length === 0) {
    return {};
  }

  return product.options.reduce<Record<string, string>>((acc, opt) => {
    // Get first available variant, fallback to empty string
    const firstVariant = opt.variants?.[0]?.value ?? '';
    return {
      ...acc,
      [opt.name]: firstVariant,
    };
  }, {});
};

/**
 * Product detail page component
 *
 * Features:
 * - Centralized state management for product options
 * - Loading states with skeletons
 * - Error handling with user-friendly messages
 * - Breadcrumb navigation
 * - SEO-friendly structure
 * - Responsive layout
 */
const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { products, isLoading, error } = useProducts();

  // Find current product
  const product = useMemo(
    () => products.find((p) => p.id === params.id),
    [products, params.id]
  );

  // Centralized state for selected product options
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize selected options when product loads
  useEffect(() => {
    if (product && !isInitialized) {
      setSelectedOptions(getDefaultOptions(product));
      setIsInitialized(true);
    }
  }, [product, isInitialized]);

  // Handle option changes
  const handleOptionChange = useCallback(
    (optionName: string, optionValue: string) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [optionName]: optionValue,
      }));
    },
    []
  );

  // Navigation handlers
  const handleBackToProducts = useCallback(() => {
    router.push('/products');
  }, [router]);

  // Loading state
  if (isLoading) {
    return (
      <div className='bg-white dark:bg-slate-950 min-h-screen'>
        <div className='container mx-auto px-4 py-12'>
          <Skeleton className='h-10 w-40 mb-6' />
          <div className='grid gap-8 md:grid-cols-2 md:gap-12'>
            <div className='space-y-4'>
              <Skeleton className='aspect-square w-full rounded-lg' />
              <div className='grid grid-cols-4 gap-2'>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className='aspect-square rounded-md' />
                ))}
              </div>
            </div>
            <div className='space-y-6'>
              <Skeleton className='h-10 w-3/4' />
              <Skeleton className='h-6 w-1/4' />
              <Skeleton className='h-24 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='bg-white dark:bg-slate-950 min-h-screen'>
        <div className='container mx-auto px-4 py-16'>
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error Loading Product</AlertTitle>
            <AlertDescription>
              {error ||
                'An unexpected error occurred while loading the product.'}
            </AlertDescription>
          </Alert>
          <div className='mt-6 flex justify-center'>
            <Button onClick={handleBackToProducts} variant='outline'>
              <ChevronLeft className='mr-2 h-4 w-4' />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className='bg-white dark:bg-slate-950 min-h-screen'>
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center space-y-6'>
            <div className='flex justify-center'>
              <div className='rounded-full bg-muted p-4'>
                <AlertCircle className='h-12 w-12 text-muted-foreground' />
              </div>
            </div>

            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tight'>
                Product Not Found
              </h1>
              <p className='text-lg text-muted-foreground max-w-md mx-auto'>
                The product you're looking for doesn't exist or may have been
                removed.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Button onClick={handleBackToProducts} size='lg'>
                <ChevronLeft className='mr-2 h-4 w-4' />
                Back to Products
              </Button>
              <Button
                variant='outline'
                size='lg'
                onClick={() => router.push('/')}
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main product detail view
  return (
    <div className='bg-white dark:bg-slate-950 min-h-screen'>
      <div className='container mx-auto px-4 py-8 sm:py-12'>
        {/* Breadcrumb Navigation */}
        <nav className='mb-6 sm:mb-8' aria-label='Breadcrumb'>
          <Button
            variant='ghost'
            onClick={handleBackToProducts}
            className='gap-2 -ml-2'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to Products
          </Button>
        </nav>

        {/* Product Main Content */}
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16'>
          {/* Product Image Gallery */}
          <ProductImageGallery
            product={product}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />

          {/* Product Purchase Panel */}
          <ProductPurchasePanel
            product={product}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        {/* Separator */}
        <Separator className='my-12 sm:my-16' />

        {/* Product Details Tabs/Sections */}
        <div className='space-y-12 sm:space-y-16'>
          {/* Reviews Section */}
          <section aria-labelledby='reviews-heading'>
            <ReviewsSection productId={product.id} />
          </section>

          {/* Separator */}
          <Separator />

          {/* Related Products */}
          <section aria-labelledby='related-products-heading'>
            <RelatedProducts currentProduct={product} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
