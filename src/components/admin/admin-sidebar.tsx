'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/users', label: 'Customers', icon: Users },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-full flex-col p-4">
        <div className="mb-4 flex items-center gap-2 p-2">
          <Package className="h-8 w-8" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                  isActive && 'bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-white'
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
