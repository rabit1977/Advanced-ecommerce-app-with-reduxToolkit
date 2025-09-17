'use client';

import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { priceFmt } from '@/lib/utils/formatters';
import { Heart, Package, ShoppingCart, User } from 'lucide-react';
import AuthGuard from '@/components/auth/auth-guard';

const AccountPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state.user);
  const { orders } = useAppSelector((state: any) => state.orders);

  const setPage = (page: string) => router.push(`/${page}`);
  const viewOrder = (orderId: string) => router.push(`/account/orders/${orderId}`);

  return (
    <AuthGuard>
      {user && (
        <div className='bg-slate-50 min-h-[70vh] dark:bg-slate-900'>
          <div className='container mx-auto px-4 py-12'>
            <div className='flex items-center gap-4 mb-8'>
              <div className='w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200'>
                <User className='h-8 w-8' />
              </div>
              <div>
                <h1 className='text-3xl font-bold tracking-tight dark:text-white'>
                  My Account
                </h1>
                <p className='text-slate-600 dark:text-slate-300'>{user.email}</p>
              </div>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='md:col-span-2'>
                <h2 className='text-xl font-semibold dark:text-white mb-4'>
                  Order History
                </h2>

                {orders.length === 0 ? (
                  <div className='bg-white rounded-lg p-6 text-center dark:bg-slate-800'>
                    <Package className='mx-auto h-12 w-12 text-slate-400' />
                    <p className='mt-4 text-slate-500 dark:text-slate-400'>
                      You haven&apos;t placed any orders yet.
                    </p>
                    <Button onClick={() => setPage('products')} className='mt-4'>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className='bg-white rounded-lg overflow-hidden shadow-sm dark:bg-slate-800'>
                    <div className='border-b dark:border-slate-700'>
                      <div className='grid grid-cols-12 px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400'>
                        <div className='col-span-4'>Order</div>
                        <div className='col-span-4'>Date</div>
                        <div className='col-span-2'>Items</div>
                        <div className='col-span-2 text-right'>Total</div>
                      </div>
                    </div>

                    <div className='divide-y dark:divide-slate-700'>
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className='group grid grid-cols-12 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors'
                          onClick={() => viewOrder(order.id)}
                        >
                          <div className='col-span-4 font-medium text-slate-800 group-hover:text-slate-900 dark:text-white dark:group-hover:text-slate-100'>
                            #{order.id}
                          </div>
                          <div className='col-span-4 text-slate-600 group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200'>
                            {order.date}
                          </div>
                          <div className='col-span-2 text-slate-600 group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200'>
                            {order.items.length} item(s)
                          </div>
                          <div className='col-span-2 text-right font-medium text-slate-800 group-hover:text-slate-900 dark:text-white dark:group-hover:text-slate-100'>
                            {priceFmt(order.total)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className='space-y-6'>
                <div className='bg-white rounded-lg p-6 shadow-sm dark:bg-slate-800'>
                  <h3 className='text-lg font-semibold dark:text-white mb-4'>
                    Account Details
                  </h3>
                  <div className='space-y-2'>
                    <div>
                      <p className='text-sm text-slate-500 dark:text-slate-400'>
                        Name
                      </p>
                      <p className='font-medium dark:text-white'>{user.name}</p>
                    </div>
                    <div>
                      <p className='text-sm text-slate-500 dark:text-slate-400'>
                        Email
                      </p>
                      <p className='font-medium dark:text-white'>{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-lg p-6 shadow-sm dark:bg-slate-800'>
                  <h3 className='text-lg font-semibold dark:text-white mb-4'>
                    Quick Actions
                  </h3>
                  <div className='space-y-3'>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      onClick={() => setPage('wishlist')}
                    >
                      <Heart className='h-4 w-4 mr-2' />
                      View Wishlist
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start'
                      onClick={() => router.push('/cart')}
                    >
                      <ShoppingCart className='h-4 w-4 mr-2' />
                      View Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  );
};

export default AccountPage;
