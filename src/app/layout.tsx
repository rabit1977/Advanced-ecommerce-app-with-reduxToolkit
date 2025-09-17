import { CartDebug } from '@/components/debug/cart-debug';
import ErrorBoundary from '@/components/error-boundary';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { QuickViewModal } from '@/components/product/quick-view-modal';
import { Toast } from '@/components/toast';
import { ReduxProvider } from '@/lib/providers/ReduxProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeManager } from '@/components/layout/theme-manager';
// import { ProductsLoader } from '@/components/products/products-loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // title.template will be used by child pages
  title: {
    template: '%s | My Awesome Store', // %s will be replaced by the child page's title
    default: 'My Awesome Store', // The default title for the site
  },
  description: 'The best place to buy awesome things!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ErrorBoundary>
          <ReduxProvider>
            <ThemeManager />
            {/* <ProductsLoader /> */}
            <div className='min-h-screen bg-white font-sans text-slate-800 dark:bg-slate-950 dark:text-slate-200'>
              <Header />
              <MobileSidebar />
              <main className='min-h-[calc(100vh-4rem)]'>{children}</main>
              <Footer />
              <QuickViewModal />
              <Toast />
            </div>
            {/* {process.env.NODE_ENV === 'development' && <CartDebug />} */}
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}