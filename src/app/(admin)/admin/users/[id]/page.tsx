'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

interface UserDetailsPageProps {
  params: Promise<{ 
    id: string; 
  }>;
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = use(params);
  const user = useAppSelector((state) => state.user.users.find(u => u.id === id));
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error('User not found.');
      router.replace('/admin/users');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">User Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="font-semibold">ID:</span> {user.id}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Role:</span> {user.role}</p>
          <p><span className="font-semibold">Created At:</span> {user.createdAt?.toString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}