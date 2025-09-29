import { AdminSidebar } from '@/components/admin/admin-sidebar';
import AdminAuthGuard from '@/components/auth/admin-auth-guard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <AdminAuthGuard>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}