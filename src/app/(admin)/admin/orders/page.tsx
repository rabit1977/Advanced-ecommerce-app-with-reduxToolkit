'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { OrdersDataTable } from '@/components/admin/orders-data-table';
import { useState, useEffect } from 'react';

export default function AdminOrdersPage() {
  const { orders } = useAppSelector((state) => state.orders);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Here you can manage customer orders.
          </p>
        </div>
      </div>
      <div className="mt-8">
        {isClient ? <OrdersDataTable orders={orders} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}