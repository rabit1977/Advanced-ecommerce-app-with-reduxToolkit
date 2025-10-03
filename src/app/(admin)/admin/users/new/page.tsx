'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { UserForm } from '@/components/admin/user-form';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/store/hooks';
import { createUserFromAdmin } from '@/lib/store/thunks/authThunks';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['admin', 'customer'], { message: 'Please select a role.' }),
});

export type UserFormValues = z.infer<typeof formSchema>;

/**
 * New user page
 */
export default function NewUserPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: UserFormValues) => {
    startTransition(async () => {
      try {
        const result = await dispatch(
          createUserFromAdmin(values.name, values.email, values.password, values.role)
        );
        
        if (result.success) {
          toast.success('User created successfully');
          router.push('/admin/users');
        } else {
          toast.error(result.message || 'Failed to create user');
        }
      } catch (error) {
        toast.error('An error occurred while creating the user');
        console.error('Create user error:', error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/users')}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Add New User
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Create a new customer or admin account
          </p>
        </div>
      </div>

      {/* Form */}
      <UserForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
