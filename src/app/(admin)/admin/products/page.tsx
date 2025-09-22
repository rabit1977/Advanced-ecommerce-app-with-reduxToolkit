import { getProducts } from "@/lib/data/get-products";
import { ProductsDataTable } from "@/components/admin/products-data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage() {
  // Fetch all products without pagination
  const { products } = await getProducts({ limit: 1000 }); // Use a high limit

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Here you can manage your products.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>
      <ProductsDataTable products={products} />
    </div>
  );
}