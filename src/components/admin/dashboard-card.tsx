'use client';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

export const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-950 dark:border-slate-800">
      <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400">{title}</h3>
      <p className="mt-2 text-3xl font-bold dark:text-white">{value}</p>
    </div>
  );
};
