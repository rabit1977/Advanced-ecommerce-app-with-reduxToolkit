import { initialProducts } from '@/lib/constants/products';
import { initialUsers } from '@/lib/constants/users';
import { DashboardCard } from '@/components/admin/dashboard-card';
import { OrdersCountCard } from '@/components/admin/orders-count-card';

export default function DashboardPage() {
  const productCount = initialProducts.length;
  const userCount = initialUsers.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard title="Total Products" value={productCount} />
        <DashboardCard title="Total Users" value={userCount} />
        <OrdersCountCard />
      </div>
    </div>
  );
}