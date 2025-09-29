import { getProductById } from '@/lib/data/get-products';
import { notFound } from 'next/navigation';
import { EditProductForm } from '@/components/admin/edit-product-form';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
