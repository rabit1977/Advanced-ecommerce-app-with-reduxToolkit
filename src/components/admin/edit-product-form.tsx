'use client';

import { useTransition } from 'react';
import { ProductForm } from '@/components/admin/product-form';
import { updateProduct } from '@/lib/actions/product-actions';
import { toast } from 'sonner';
import { Product } from '@/lib/types';

interface EditProductFormProps {
  product: Product;
}

export const EditProductForm = ({ product }: EditProductFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: any) => {
    startTransition(async () => {
      const result = await updateProduct(product.id, values);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Product updated successfully!');
      }
    });
  };

  return (
    <ProductForm
      product={product}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
};
