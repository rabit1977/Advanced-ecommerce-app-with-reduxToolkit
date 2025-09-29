'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppSelector } from '@/lib/store/hooks';
import { priceFmt } from '@/lib/utils/formatters';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === id)
  );
  const router = useRouter();
 const viewOrder = (orderId: string) => router.push(`/account/orders/${orderId}`);

  useEffect(() => {
    if (!order) {
      toast.error('Order not found.');
      router.replace('/admin/orders');
    }
  }, [order, router]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>Order Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
          <CardDescription>
            {new Date(order.date).toLocaleDateString()} - {order.status}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Customer</h3>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zip}
            </p>
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-2'>Items</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} className='flex justify-between'>
                  <span className='hover:underline cursor-pointer hover:text-blue-600' onClick={() => viewOrder(order.id)}>
                    {item.title} x {item.quantity}
                  </span>
                  <span>{priceFmt(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className='flex justify-between font-bold mt-2'>
              <span>Total</span>
              <span>{priceFmt(order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
