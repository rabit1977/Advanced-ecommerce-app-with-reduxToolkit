'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { UserForm } from '@/components/admin/user-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { createUserFromAdmin } from '@/lib/store/thunks/authThunks';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['admin', 'customer'], { message: 'Please select a role.' }),
});

export default function NewUserPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      const result = dispatch(createUserFromAdmin(values.name, values.email, values.password, values.role));
      if (result.success) {
        router.push('/admin/users');
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Add New User</h1>
      <UserForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
