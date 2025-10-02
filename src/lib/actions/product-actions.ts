'use server';

import { initialProducts } from '@/lib/constants/products';
import { Product } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as z from 'zod';

/**
 * Validation schema for product forms
 * Shared between client and server for consistency
 */
export const productFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  stock: z.coerce.number().int().min(0, 'Stock must be a positive integer'),
  brand: z.string().min(2, 'Brand must be at least 2 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

/**
 * Server action result type
 */
type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Generate unique product ID
 */
const generateProductId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `sku-${timestamp}-${random}`;
};

/**
 * Add a new product
 * @param values - Product form data
 * @returns Action result with success status
 */
export async function addProduct(
  values: ProductFormValues
): Promise<ActionResult<{ id: string }>> {
  try {
    // Validate input
    const validatedFields = productFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors[0]?.message || 'Invalid fields!',
      };
    }

    const { title, description, price, stock, brand, category } =
      validatedFields.data;

    // Create new product
    const newProduct: Product = {
      id: generateProductId(),
      title,
      description,
      price,
      stock,
      brand,
      category,
      rating: 0,
      reviewCount: 0,
      images: ['/images/placeholder.jpg'],
      reviews: [],
    };

    // TODO: Replace with database call
    // await db.product.create({ data: newProduct });
    initialProducts.unshift(newProduct);

    // Revalidate cache
    revalidatePath('/admin/products');
    revalidatePath('/');

    // Return success before redirect
    const result: ActionResult<{ id: string }> = {
      success: true,
      data: { id: newProduct.id },
    };

    // Redirect after returning result
    redirect('/admin/products');
  } catch (error) {
    // Handle unexpected errors
    console.error('Error adding product:', error);
    return {
      success: false,
      error: 'Failed to add product. Please try again.',
    };
  }
}

/**
 * Update an existing product
 * @param productId - Product ID to update
 * @param values - Updated product data
 * @returns Action result with success status
 */
export async function updateProduct(
  productId: string,
  values: ProductFormValues
): Promise<ActionResult> {
  try {
    // Validate input
    const validatedFields = productFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors[0]?.message || 'Invalid fields!',
      };
    }

    // Find product
    const productIndex = initialProducts.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return {
        success: false,
        error: 'Product not found!',
      };
    }

    // TODO: Replace with database call
    // await db.product.update({
    //   where: { id: productId },
    //   data: validatedFields.data
    // });

    // Update product while preserving other fields
    initialProducts[productIndex] = {
      ...initialProducts[productIndex],
      ...validatedFields.data,
    };

    // Revalidate cache
    revalidatePath('/admin/products');
    revalidatePath(`/products/${productId}`);
    revalidatePath('/');

    // Redirect after successful update
    redirect('/admin/products');
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: 'Failed to update product. Please try again.',
    };
  }
}

/**
 * Delete a product
 * @param productId - Product ID to delete
 * @returns Action result with success status
 */
export async function deleteProduct(productId: string): Promise<ActionResult> {
  try {
    // Find product
    const index = initialProducts.findIndex((p) => p.id === productId);

    if (index === -1) {
      return {
        success: false,
        error: 'Product not found!',
      };
    }

    // TODO: Replace with database call
    // await db.product.delete({ where: { id: productId } });
    initialProducts.splice(index, 1);

    // Revalidate cache
    revalidatePath('/admin/products');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: 'Failed to delete product. Please try again.',
    };
  }
}

/**
 * Bulk delete products
 * @param productIds - Array of product IDs to delete
 * @returns Action result with count of deleted products
 */
export async function bulkDeleteProducts(
  productIds: string[]
): Promise<ActionResult<{ count: number }>> {
  try {
    if (!productIds.length) {
      return {
        success: false,
        error: 'No products selected',
      };
    }

    let deletedCount = 0;

    // Delete in reverse order to avoid index shifting issues
    for (let i = initialProducts.length - 1; i >= 0; i--) {
      if (productIds.includes(initialProducts[i].id)) {
        initialProducts.splice(i, 1);
        deletedCount++;
      }
    }

    // Revalidate cache
    revalidatePath('/admin/products');
    revalidatePath('/');

    return {
      success: true,
      data: { count: deletedCount },
    };
  } catch (error) {
    console.error('Error bulk deleting products:', error);
    return {
      success: false,
      error: 'Failed to delete products. Please try again.',
    };
  }
}
