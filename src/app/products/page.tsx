import { ProductGrid } from '@/components/product/product-grid';

interface ProductsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  // Product fetching logic will go here later

  return (
    <ProductGrid
      title='All Products'
      subtitle='Browse our complete collection'
    />
  );
};

export default ProductsPage;