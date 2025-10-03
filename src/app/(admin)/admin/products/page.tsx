import { Suspense } from 'react';
import { getProducts, getCategories, getBrands } from '@/lib/data/get-products';
import { ProductsDataTable } from '@/components/admin/products-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Package } from 'lucide-react';
import Link from 'next/link';

/**
 * Products list skeleton
 */
function ProductsListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Products stats component
 */
async function ProductsStats() {
  const [{ products }, categories, brands] = await Promise.all([
    getProducts({ limit: 1000 }),
    getCategories(),
    getBrands(),
  ]);

  const stats = {
    total: products.length,
    categories: categories.length,
    brands: brands.length,
    lowStock: products.filter((p) => p.stock < 10).length,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Products
            </p>
            <p className="text-3xl font-bold dark:text-white mt-2">
              {stats.total}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Categories
            </p>
            <p className="text-3xl font-bold dark:text-white mt-2">
              {stats.categories}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Brands
            </p>
            <p className="text-3xl font-bold dark:text-white mt-2">
              {stats.brands}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Low Stock
            </p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
              {stats.lowStock}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Products table component
 */
async function ProductsTable() {
  const { products } = await getProducts({ limit: 1000 });
  return <ProductsDataTable products={products} />;
}

/**
 * Admin products page
 */
export default async function AdminProductsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              Products
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsStats />
      </Suspense>

      {/* Products Table */}
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ProductsTable />
      </Suspense>
    </div>
  );
}