'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { type ProductFormValues } from '@/lib/schemas/product-schema';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '@/lib/hooks/useProducts';

export default function NewProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { createProduct } = useProducts();

  const handleSubmit = (values: ProductFormValues) => {
    startTransition(async () => {
      try {
        // Create product using Redux thunk
        const result = createProduct({
          title: values.title,
          description: values.description,
          price: values.price,
          stock: values.stock,
          brand: values.brand,
          category: values.category,
          images: values.images,
          imageUrl: values.imageUrl,
          discount: values.discount,
          tags: values.tags,
          options: values.options,
        });

        if (result.success) {
          // Navigate back to products list
          router.push('/admin/products');
          router.refresh();
        }
      } catch (error) {
        console.error('Create product error:', error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/products')}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Add New Product
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Create a new product in your catalog
          </p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}