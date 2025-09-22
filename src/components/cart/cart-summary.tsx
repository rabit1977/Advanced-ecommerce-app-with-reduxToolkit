'use client';

import { Button } from '@/components/ui/button';
import { priceFmt } from '@/lib/utils/formatters';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  taxes?: number;
  discount?: number;
  total: number;
  isCollapsible?: boolean; // New prop
}

const CartSummary = ({
  subtotal,
  shipping = 5,
  taxes = 0,
  discount = 0,
  total,
  isCollapsible = false, // Default to false
}: CartSummaryProps) => {
  const router = useRouter();

  const navigateToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div
      className={cn(
        'h-fit',
        !isCollapsible &&
          'rounded-lg border bg-white p-6 shadow-sm lg:sticky top-24 dark:bg-slate-950 dark:border-slate-800'
      )}
    >
      {!isCollapsible && (
        <h2 className='text-lg font-medium dark:text-white'>Order summary</h2>
      )}
      <div className={cn('space-y-4', !isCollapsible && 'mt-6')}>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-slate-600 dark:text-slate-300'>Subtotal</p>
          <p className='text-sm font-medium dark:text-white'>
            {priceFmt(subtotal)}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-slate-600 dark:text-slate-300'>Shipping</p>
          <p className='text-sm font-medium dark:text-white'>
            {priceFmt(shipping)}
          </p>
        </div>
        {discount > 0 && (
          <div className='flex items-center justify-between text-green-600 dark:text-green-400'>
            <p className='text-sm'>Discount</p>
            <p className='text-sm font-medium'>-{priceFmt(discount)}</p>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <p className='text-sm text-slate-600 dark:text-slate-300'>Taxes</p>
          <p className='text-sm font-medium dark:text-white'>
            {priceFmt(taxes)}
          </p>
        </div>
        <div className='border-t border-slate-200 pt-4 flex items-center justify-between dark:border-slate-800'>
          <p className='text-base font-medium dark:text-white'>Order total</p>
          <p className='text-base font-medium dark:text-white'>
            {priceFmt(total)}
          </p>
        </div>
      </div>
      {!isCollapsible && (
        <Button size='lg' className='w-full mt-6' onClick={navigateToCheckout}>
          Checkout
        </Button>
      )}
    </div>
  );
};

export { CartSummary };