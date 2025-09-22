'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname} // Animate when the key (pathname) changes
        initial={{ opacity: 0, y: 10 }} // Start transparent and slightly down
        animate={{ opacity: 1, y: 0 }} // Animate to fully visible and at original position
        exit={{ opacity: 0, y: -10 }} // Animate out transparent and slightly up
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
