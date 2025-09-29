'use client';

import { useTransition } from 'react';
import { ProductForm } from '@/components/admin/product-form';
import { addProduct } from '@/lib/actions/product-actions';
import { toast } from 'sonner';
import * as z from 'zod';

// This schema should match the one in ProductForm
const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  stock: z.number().int().min(0, { message: 'Stock must be a positive integer.' }),
  brand: z.string().min(2, { message: 'Brand is required.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
});

export default function NewProductPage() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await addProduct(values);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}