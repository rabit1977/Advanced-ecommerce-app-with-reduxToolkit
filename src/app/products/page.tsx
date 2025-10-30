import { ProductGrid } from '@/components/product/product-grid';
import { getProducts, SortKey } from '@/lib/data/get-products';

// Explicitly mark this page as dynamic
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  
  // Parse and validate search params
  const query = (params?.search as string) || '';
  const category = (params?.category as string) || 'all';
  const brands = (params?.brands as string) || '';
  const minPrice = Number(params?.minPrice) || undefined;
  const maxPrice = Number(params?.maxPrice) || undefined;
  const sort = (params?.sort as SortKey) || 'featured';
  const page = Number(params?.page) || 1;

  // Fetch data from the server with all options
  const { products, totalCount } = await getProducts({
    query,
    category,
    brands,
    minPrice,
    maxPrice,
    sort,
    page,
    limit: 8, // The number of products per page
  });

  // Pass the pre-filtered, pre-sorted, and pre-paginated data to the client component
  return (
    <ProductGrid
      title='All Products'
      subtitle='Browse our complete collection'
      products={products}
      totalCount={totalCount}
      currentPage={page}
      currentCategory={category}
      currentBrands={brands}
      currentMinPrice={minPrice}
      currentMaxPrice={maxPrice}
      currentSort={sort}
    />
  );
};

export default ProductsPage;