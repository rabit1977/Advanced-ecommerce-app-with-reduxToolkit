'use client';

import { useMemo, useTransition, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateOrderStatus } from '@/lib/store/thunks/orderThunks';
import { formatPrice, formatOrderDate, formatDateTime } from '@/lib/utils/formatters';
import { 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Truck,
  Calendar,
  Loader2,
  Mail,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';
import { Order } from '@/lib/types';

/**
 * Get status badge variant based on order status
 */
const getStatusVariant = (status: Order['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const variants: Partial<Record<Order['status'], 'default' | 'secondary' | 'destructive' | 'outline'>> = {
    'Pending': 'secondary',
    'Processing': 'secondary',
    'Shipped': 'default',
    'Delivered': 'outline',
    'Cancelled': 'destructive',
  };
  return variants[status] || 'default';
};

/**
 * Loading skeleton component
 */
function OrderDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse ml-12" />
        </div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Page component with Suspense boundary
 */
export default function AdminOrderDetailsPage() {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <AdminOrderDetailsContent />
    </Suspense>
  );
}

/**
 * Order not found component
 */
function OrderNotFound() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Package className="h-16 w-16 text-slate-300 dark:text-slate-600" />
      <h2 className="text-2xl font-bold dark:text-white">Order Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
        The order you're looking for doesn't exist or has been removed.
      </p>
      <Button onClick={() => router.push('/admin/orders')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </Button>
    </div>
  );
}

/**
 * Main order details component
 */
function AdminOrderDetailsContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  // Get order from Redux store
  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === params.id)
  );

  // Handle status change
  const handleStatusChange = async (newStatus: Order['status']) => {
    if (!order) return;

    try {
      await dispatch(updateOrderStatus({ 
        orderId: order.id, 
        newStatus 
      })).unwrap();
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Status update error:', error);
    }
  };

  // Navigate to customer order view
  const viewCustomerOrder = () => {
    if (order) {
      startTransition(() => {
        router.push(`/account/orders/${order.id}`);
      });
    }
  };

  // Show not found if order doesn't exist
  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/admin/orders')}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold dark:text-white">
              Order Details
            </h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 ml-12">
            Manage and view order information
          </p>
        </div>

        <Button
          variant="outline"
          onClick={viewCustomerOrder}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Package className="h-4 w-4 mr-2" />
          )}
          Customer View
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(order.date)}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Update Status
                  </label>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(value as Order['status'])}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={item.cartItemId}>
                    {index > 0 && <Separator />}
                    <div className="flex items-center gap-4 py-2">
                      <div className="w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden border dark:border-slate-700">
                        <Image
                          src={item.image || '/images/placeholder.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium dark:text-white truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>{formatPrice(item.price)} each</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium dark:text-white">
                    {formatPrice(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                  <span className="font-medium dark:text-white">
                    {formatPrice(0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Tax</span>
                  <span className="font-medium dark:text-white">
                    {formatPrice(0)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold pt-2">
                  <span className="dark:text-white">Total</span>
                  <span className="dark:text-white">{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold dark:text-white">
                  {order.shippingAddress.name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Customer since {formatOrderDate(order.date)}
                </p>
              </div>
              
              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">
                    customer@example.com
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">
                    +1 (555) 123-4567
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <p className="font-medium text-slate-900 dark:text-white">
                  {order.shippingAddress.name}
                </p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </address>
            </CardContent>
          </Card>

          {/* Shipping Method Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="h-5 w-5" />
                Shipping Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium dark:text-white">
                  Standard Shipping
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Delivery in 5-7 business days
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium dark:text-white">
                  {order.paymentMethod}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Payment processed successfully
                </p>
                <Badge variant="outline" className="mt-2">
                  Paid
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}