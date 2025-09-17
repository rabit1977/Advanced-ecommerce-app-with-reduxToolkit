import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/data/get-products';

interface ProductsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const query = searchParams?.search as string || '';
  const products = await getProducts(query);

  return (
    <ProductGrid
      title='All Products'
      subtitle='Browse our complete collection'
      products={products}
    />
  );
};

export default ProductsPage;