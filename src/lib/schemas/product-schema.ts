import * as z from 'zod';

/**
 * Product form validation schema
 * Shared between client and server
 */
export const productFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0, { message: 'Price must be a positive number.' }),
  stock: z
    .number({ invalid_type_error: 'Stock must be a number' })
    .int({ message: 'Stock must be a whole number' })
    .min(0, { message: 'Stock must be a positive integer.' }),
  brand: z.string().min(2, { message: 'Brand is required.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
