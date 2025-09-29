'use client';

import { useTransition } from 'react';
import { ProductForm } from '@/components/admin/product-form';
import { updateProduct } from '@/lib/actions/product-actions';
import { toast } from 'sonner';
import * as z from 'zod';
import { Product } from '@/lib/types';

// This schema should match the one in ProductForm
const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  stock: z.number().int().min(0, { message: 'Stock must be a positive integer.' }),
  brand: z.string().min(2, { message: 'Brand is required.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
});

interface EditProductFormProps {
  product: Product;
}

export const EditProductForm = ({ product }: EditProductFormProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await updateProduct(product.id, values);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <ProductForm product={product} onSubmit={handleSubmit} isSubmitting={isPending} />
  );
};