import { initialProducts } from "@/lib/constants";
import { Product } from "@/lib/types";

export async function getProducts(query?: string): Promise<Product[]> {
  // Simulate a database fetch delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let products = initialProducts;

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

  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate a database fetch delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return initialProducts.find((product) => product.id === id);
}
