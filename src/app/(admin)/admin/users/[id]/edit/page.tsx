'use client';

import { UserForm } from '@/components/admin/user-form';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/store/hooks';
import { updateUserFromAdmin } from '@/lib/store/thunks/authThunks';
import { useRouter } from 'next/navigation';
import { use, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .optional()
    .or(z.literal('')),
  role: z.enum(['admin', 'customer'], { message: 'Please select a role.' }),
});

interface EditUserPageProps {
params: Promise<{ 
    id: string; 
  }>;
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const { id } = use(params);
  const user = useAppSelector((state) =>
    state.user.users.find((u) => u.id === id)
  );

  // const { id } = use(params);
  // const user = useAppSelector((state) => state.user.users.find(u => u.id === id));

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      toast.error('User not found.');
      router.replace('/admin/users');
    }
  }, [user, router]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      const result = dispatch(updateUserFromAdmin(id, values));
      if (result.success) {
        router.push('/admin/users');
      }
    });
  };

  if (!user) {
    // Render a loading state or null while redirecting
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>Edit User</h1>
      <UserForm user={user} onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
