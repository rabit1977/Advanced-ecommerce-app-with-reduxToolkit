import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/data/get-products';

export default async function HomePage() {
  const products = await getProducts(); // Fetch all products for both Hero and ProductGrid

  return (
    <>
      <Hero products={products} />
      <ProductGrid
        title='Featured Products'
        subtitle='Check out our latest and greatest'
        products={products}
      />
    </>
  );
}