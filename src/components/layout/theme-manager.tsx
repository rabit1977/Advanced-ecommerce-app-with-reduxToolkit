'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/store/hooks';

const ThemeManager = () => {
  const { theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return null;
};

export { ThemeManager };
