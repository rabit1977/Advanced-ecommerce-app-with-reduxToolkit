'use client';

import React from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AuthGuard from '@/components/auth/auth-guard';

const OrderConfirmationPage = () => {
  const router = useRouter();
  const { orders } = useAppSelector((state) => state.orders);
  const lastOrder = orders[0];

  const setPage = (page: string) => router.push(`/${page}`);

  return (
    <AuthGuard>
      {lastOrder ? (
        <div className="bg-slate-50 min-h-[70vh] dark:bg-slate-900">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto dark:bg-green-900">
              <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="mt-6 text-2xl font-bold dark:text-white">Thank you for your order!</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Your order <span className="font-medium text-slate-800 dark:text-slate-200">#{lastOrder.id}</span> has been placed successfully.
            </p>
            
            <div className="mt-8 bg-white rounded-lg p-6 max-w-md mx-auto shadow-sm dark:bg-slate-800">
              <h3 className="text-lg font-semibold dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Order Number</span>
                  <span className="font-medium dark:text-white">#{lastOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Date</span>
                  <span className="font-medium dark:text-white">{lastOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Total</span>
                  <span className="font-medium dark:text-white">${lastOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Items</span>
                  <span className="font-medium dark:text-white">{lastOrder.items.length}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push('/products')}>
                Continue Shopping
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push('/account')}>
                View Order Details
              </Button>
            </div>
            
            <div className="mt-12 bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold dark:text-white mb-2">What&apos;s Next?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                You&apos;ll receive an email confirmation shortly. We&apos;ll notify you when your order has shipped. 
                Most orders are processed within 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-slate-300 dark:text-slate-700" />
          <h2 className="mt-6 text-2xl font-bold dark:text-white">No recent orders found</h2>
          <Button onClick={() => setPage('products')} className="mt-8">
            Start Shopping
          </Button>
        </div>
      )}
    </AuthGuard>
  );
};

export default OrderConfirmationPage;
