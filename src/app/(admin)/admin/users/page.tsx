'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { UsersDataTable } from '@/components/admin/users-data-table';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const { users } = useAppSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Here you can manage your customers.
          </p>
        </div>
        <Link href="/admin/users/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        {isClient ? <UsersDataTable users={users} /> : <div>Loading...</div>} 
      </div>
    </div>
  );
}