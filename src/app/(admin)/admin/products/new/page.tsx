'use client';

import { useTransition } from 'react';
import { ProductForm } from '@/components/admin/product-form';
import { addProduct } from '@/lib/actions/product-actions';
import { toast } from 'sonner';

export default function NewProductPage() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: any) => {
    startTransition(async () => {
      const result = await addProduct(values);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Product created successfully!');
      }
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Fill out the form below to create a new product.
        </p>
      </div>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
