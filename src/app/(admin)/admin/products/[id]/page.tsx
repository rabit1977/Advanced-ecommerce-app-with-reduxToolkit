import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductById } from '@/lib/data/get-products';
import { formatPrice } from '@/lib/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  DollarSign, 
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Product details skeleton
 */
function ProductDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * Product details content
 */
async function ProductDetailsContent({ productId }: { productId: string }) {
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const stockStatus = product.stock === 0 
    ? { label: 'Out of Stock', color: 'text-red-600 dark:text-red-400' }
    : product.stock < 10
    ? { label: 'Low Stock', color: 'text-orange-600 dark:text-orange-400' }
    : { label: 'In Stock', color: 'text-green-600 dark:text-green-400' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href="/admin/products">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold dark:text-white">
              Product Details
            </h1>
          </div>
        </div>
        <Button asChild>
          <Link href={`/admin/products/${product.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {product.brand} • {product.category}
                  </CardDescription>
                </div>
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                  {stockStatus.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Image and Basic Info */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 h-64 relative rounded-lg overflow-hidden border dark:border-slate-700">
                  <Image
                    alt={product.title}
                    src={product.images?.[0] || '/images/placeholder.jpg'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Product ID
                      </p>
                      <p className="text-sm font-mono mt-1 dark:text-white">
                        {product.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        SKU
                      </p>
                      <p className="text-sm font-mono mt-1 dark:text-white">
                        {product.sku || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Price
                      </p>
                      <p className="text-lg font-bold mt-1 dark:text-white">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Stock
                      </p>
                      <p className={`text-lg font-bold mt-1 ${stockStatus.color}`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold dark:text-white">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Description
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Additional Images */}
              {product.images && product.images.length > 1 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-4 dark:text-white">
                      Product Images
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square relative rounded-lg overflow-hidden border dark:border-slate-700"
                        >
                          <Image
                            src={image}
                            alt={`${product.title} - ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Price
                  </span>
                </div>
                <span className="font-semibold dark:text-white">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Stock
                  </span>
                </div>
                <span className={`font-semibold ${stockStatus.color}`}>
                  {product.stock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Rating
                  </span>
                </div>
                <span className="font-semibold dark:text-white">
                  {product.rating} / 5
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Stock Alert */}
          {product.stock < 10 && (
            <Card className="border-orange-200 dark:border-orange-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <AlertCircle className="h-5 w-5" />
                  Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {product.stock === 0
                    ? 'This product is out of stock. Consider restocking soon.'
                    : `Only ${product.stock} units left in stock. Consider restocking.`}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Category & Brand */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Category
                </p>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Brand
                </p>
                <Badge variant="outline">{product.brand}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * Product details page with Suspense
 */
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent productId={id} />
    </Suspense>
  );
}