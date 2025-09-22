import { Hero } from '@/components/home/hero';
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/data/get-products';

export default async function HomePage() {
  // Fetch a limited number of products for the hero and featured grid
  const { products } = await getProducts({ limit: 8, sort: 'featured' });

  return (
    <>
      {/* The Hero component expects the full product list for its carousel */}
      <Hero products={products} />

      {/* The ProductGrid now requires more props, so we provide sensible defaults for the homepage */}
      <ProductGrid
        title='Featured Products'
        subtitle='Check out our latest and greatest'
        products={products}
        totalCount={products.length} // The total count is just the number of featured products
        currentPage={1}
        currentCategory='all'
        currentBrands=''
        currentSort='featured'
      />
    </>
  );
}
