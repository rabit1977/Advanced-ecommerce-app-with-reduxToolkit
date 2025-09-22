'use server';

import * as z from 'zod';
import { initialProducts } from '@/lib/constants/products';
import { Product } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define the same schema as the form for server-side validation
const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().int().min(0),
  brand: z.string().min(2),
  category: z.string().min(2),
});

export const addProduct = async (values: z.infer<typeof formSchema>) => {
  // 1. Validate the data on the server
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { title, description, price, stock, brand, category } = validatedFields.data;

  // 2. Construct the new product object
  const newProduct: Product = {
    id: `sku-${Date.now()}`,
    title,
    description,
    price,
    stock,
    brand,
    category,
    rating: 0, // Default value
    reviewCount: 0, // Default value
    images: ['/images/placeholder.jpg'], // Default placeholder
  };

  // 3. Mutate the data source
  // In a real app, this would be a database call, e.g.:
  // await db.product.create({ data: newProduct });
  // For this demo, we'll just push to the in-memory array.
  initialProducts.unshift(newProduct);

  // 4. Revalidate the cache and redirect
  revalidatePath('/admin/products');
  revalidatePath('/'); // Revalidate home page as well
  redirect('/admin/products');
};

export const updateProduct = async (productId: string, values: z.infer<typeof formSchema>) => {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const productIndex = initialProducts.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return { error: "Product not found!" };
  }

  // In a real app, this would be a database call.
  initialProducts[productIndex] = {
    ...initialProducts[productIndex],
    ...validatedFields.data,
  };

  revalidatePath('/admin/products');
  revalidatePath(`/products/${productId}`);
  redirect('/admin/products');
};

export const deleteProduct = async (productId: string) => {
  const index = initialProducts.findIndex((p) => p.id === productId);

  if (index === -1) {
    return {
      error: "Product not found!",
    };
  }

  // In a real app, this would be a database call.
  initialProducts.splice(index, 1);

  revalidatePath('/admin/products');
  revalidatePath('/');
};
