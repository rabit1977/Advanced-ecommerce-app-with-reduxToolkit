'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { addProduct } from '@/lib/actions/product-actions';
import { type ProductFormValues } from '@/lib/schemas/product-schema';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function NewProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (values: ProductFormValues) => {
    startTransition(async () => {
      try {
        // Convert to FormData for server action
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('stock', values.stock.toString());
        formData.append('brand', values.brand);
        formData.append('category', values.category);

        const result = await addProduct(formData);
        
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success('Product created successfully');
          // Navigation handled by server action redirect
        }
      } catch (error) {
        // Redirect error is expected - it's how Next.js handles server action redirects
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
          return; // This is the successful redirect, don't show error
        }
        toast.error('Failed to create product');
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