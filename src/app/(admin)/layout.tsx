import {
  AdminMobileSidebar,
  AdminSidebar,
} from '@/components/admin/admin-sidebar';
import AdminAuthGuard from '@/components/auth/admin-auth-guard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className='flex min-h-screen'>
        {/* Desktop Sidebar */}
        <AdminSidebar />

        {/* Mobile Sidebar Toggle */}
        <div className='absolute top-24 right-32'>
          <AdminMobileSidebar />
        </div>

        {/* Main Content */}
        <main className='flex-1 overflow-x-hidden'>
          <div className='container mx-auto p-6 lg:p-8'>{children}</div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
