import { ProductGrid } from '@/components/product/product-grid';
import { getProducts, SortKey } from '@/lib/data/get-products';

// Explicitly mark this page as dynamic
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async (props: ProductsPageProps) => {
  const { searchParams } = props;
  // 1. Parse and validate search params
  const query = (searchParams?.search as string) || '';
  const category = (searchParams?.category as string) || 'all';
  const brands = (searchParams?.brands as string) || '';
  const minPrice = Number(searchParams?.minPrice) || undefined;
  const maxPrice = Number(searchParams?.maxPrice) || undefined;
  const sort = (searchParams?.sort as SortKey) || 'featured';
  const page = Number(searchParams?.page) || 1;

  // 2. Fetch data from the server with all options
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

  // 3. Pass the pre-filtered, pre-sorted, and pre-paginated data to the client component
  return (
    <ProductGrid
      title='All Products'
      subtitle='Browse our complete collection'
      products={products}
      totalCount={totalCount}
      // Pass down current params so the client component knows its state
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
