// app/page.tsx
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/product/featured-products';
import { getProducts } from '@/lib/data/get-products';

export default async function HomePage() {
  const { products } = await getProducts({ limit: 10, sort: 'featured' });

  return (
    <>
      <Hero
        products={products}
        carouselLimit={5}
        autoPlayInterval={4000}
        showTestimonials={true}
      />
      <FeaturedProducts
        title='Featured Products'
        subtitle='Check out our latest and greatest'
        products={products}
      />
    </>
  );
}
