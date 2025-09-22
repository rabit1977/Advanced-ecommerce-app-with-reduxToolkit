'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { showToast } from '@/lib/store/thunks/uiThunks';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const { user, users } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // First, check if authentication is still loading or if there is no user.
    // We also check the `users` array as a proxy for initial state loading.
    if (users.length === 0) {
      // Data might still be loading, don't do anything yet.
      return;
    }

    // If there is no logged-in user, redirect to login.
    if (!user) {
      dispatch(showToast('You must be logged in to view this page.', 'error'));
      router.replace('/auth');
      return;
    }

    // If the user is not an admin, redirect them away.
    if (user.role !== 'admin') {
      dispatch(showToast('You do not have permission to access this page.', 'error'));
      router.replace('/');
    }
  }, [user, users, router, dispatch]);

  // If the user is an admin, render the children.
  // We can show a loading spinner here while waiting for the user check.
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading or verifying permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
