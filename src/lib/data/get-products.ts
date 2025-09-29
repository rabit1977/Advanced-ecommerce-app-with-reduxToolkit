import { initialProducts } from "@/lib/constants";
import { Product } from "@/lib/types";

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

// Helper to extract number from SKU for sorting
const extractIdNumber = (id: string): number => {
  const match = id.match(/\d+$/);
  return match ? parseInt(match[0], 10) : 0;
};

// This map should live on the server, where the sorting happens.
const sortOptions: Record<SortKey, (a: Product, b: Product) => number> = {
  // Featured will now sort by highest rating as a sensible default
  featured: (a, b) => (b.rating || 0) - (a.rating || 0),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating || 0) - (a.rating || 0),
  // Newest will sort by the numerical part of the product ID, descending
  newest: (a, b) => extractIdNumber(b.id) - extractIdNumber(a.id),
};

interface GetProductsOptions {
  query?: string;
  category?: string;
  brands?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
  page?: number;
  limit?: number;
}

interface GetProductsResult {
  products: Product[];
  totalCount: number;
}

export async function getProducts(
  options: GetProductsOptions = {},
  productSource: Product[] = initialProducts 
): Promise<GetProductsResult> {
  const { query, category, brands, minPrice, maxPrice, sort = 'featured', page = 1, limit = 8 } = options;

  // Simulate a database fetch delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let products = productSource;

  // 1. Filter by search query
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    products = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery) ||
        product.brand.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // 2. Filter by category (case-insensitive)
  if (category && category !== 'all') {
    products = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }

  // 3. Filter by brands (case-insensitive)
  if (brands) {
    const selectedBrands = new Set(brands.split(',').map(b => b.toLowerCase()));
    products = products.filter((product) => selectedBrands.has(product.brand.toLowerCase()));
  }

  // 4. Filter by price range
  if (minPrice !== undefined) {
    products = products.filter((product) => product.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    products = products.filter((product) => product.price <= maxPrice);
  }

  // 5. Get total count after filtering
  const totalCount = products.length;

  // 6. Sort
  products.sort(sortOptions[sort]);

  // 7. Paginate
  const startIndex = (page - 1) * limit;
  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  return { products: paginatedProducts, totalCount };
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate a database fetch delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return initialProducts.find((product) => product.id === id);
}