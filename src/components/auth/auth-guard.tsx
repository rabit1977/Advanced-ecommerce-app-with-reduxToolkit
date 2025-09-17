'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the initial state to be loaded, especially from redux-persist
    const timer = setTimeout(() => {
        if (user === undefined) {
            // The user state is not yet determined, so we wait a bit more.
            // This is a simple way to handle rehydration.
            return;
        }

        if (!user) {
            router.replace('/auth');
        } else {
            setIsLoading(false);
        }
    }, 500); // A small delay to allow the store to hydrate

    // A fallback for when the user state is determined quickly
    if (user) {
        setIsLoading(false);
        clearTimeout(timer);
    } else if (user === null) {
        router.replace('/auth');
        clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-slate-400" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
