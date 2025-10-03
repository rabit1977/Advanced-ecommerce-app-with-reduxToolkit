'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteProduct } from '@/lib/actions/product-actions';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/formatters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog';

interface ProductsDataTableProps {
  products: Product[];
}

export const ProductsDataTable = ({ products }: ProductsDataTableProps) => {
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    startTransition(async () => {
      const result = await deleteProduct(productToDelete.id);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`Product "${productToDelete.title}" deleted.`);
      }
      setShowDeleteDialog(false);
      setProductToDelete(null);
    });
  };

  return (
    <>
      <div className='rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-800'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden w-[100px] sm:table-cell'>
                <span className='sr-only'>Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='hidden md:table-cell'>Price</TableHead>
              <TableHead className='hidden md:table-cell'>Stock</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className='hidden sm:table-cell'>
                  <Image
                    alt={product.title}
                    className='aspect-square rounded-md object-cover'
                    width={64}
                    height={64}
                    priority
                    src={product.images?.[0] || '/images/placeholder.jpg'}
                  />
                </TableCell>
                <TableCell className='font-medium'>{product.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={product.stock > 0 ? 'outline' : 'destructive'}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {product.stock}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='text-red-500'
                        onSelect={() => handleDeleteClick(product)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product
              <span className='font-semibold'> {productToDelete?.title}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
