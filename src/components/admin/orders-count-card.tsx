'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { DashboardCard } from './dashboard-card';
import { useState, useEffect } from 'react';

export const OrdersCountCard = () => {
  const { orders } = useAppSelector((state) => state.orders);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DashboardCard title="Total Orders" value={isClient ? orders.length : '...'} />
  );
};
