'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LayoutDashboard, Package, ShoppingCart, Users, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/users', label: 'Customers', icon: Users },
];

/**
 * Navigation links component - shared between desktop and mobile
 */
function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
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
  );
}

/**
 * Desktop Sidebar - hidden on mobile/tablet
 */
export const AdminSidebar = () => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto border-r bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-full flex-col p-4">
        <div className="mb-6 flex items-center gap-2 p-2">
          <Package className="h-8 w-8 text-slate-900 dark:text-white" />
          <h1 className="text-xl font-bold dark:text-white">Admin Panel</h1>
        </div>
        <NavLinks />
      </div>
    </aside>
  );
};

/**
 * Mobile Sidebar Toggle - shown on mobile/tablet
 */
export const AdminMobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden z-50">
      <Sheet open={open} onOpenChange={setOpen} defaultOpen={false}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shadow-lg">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0">
          <div className="flex h-full flex-col p-4">
            <div className="mb-6 flex items-center gap-2 p-2">
              <Package className="h-8 w-8 text-slate-900 dark:text-white" />
              <h1 className="text-xl font-bold dark:text-white">Admin Panel</h1>
            </div>
            <NavLinks onLinkClick={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};