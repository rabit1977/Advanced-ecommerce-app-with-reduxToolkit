import { getProductById } from "@/lib/data/get-products";
import { EditProductForm } from "@/components/admin/edit-product-form";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Editing product: <span className="font-semibold text-slate-800 dark:text-slate-200">{product.title}</span>
        </p>
      </div>
      <EditProductForm product={product} />
    </div>
  );
}
