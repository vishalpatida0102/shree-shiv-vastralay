import type { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <AdminSidebar />
      <div className="min-h-screen" id="admin-main">
        <style>{`
          @media (min-width: 1024px) {
            #admin-main { margin-left: 250px; }
          }
        `}</style>
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 px-6 md:px-8 bg-white border-b border-[#f0f0f0]">
          <h1 className="text-lg font-semibold text-[#333] pl-12 lg:pl-0">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d35400] to-[#e67e22] flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm text-[#555] hidden sm:block">Admin</span>
          </div>
        </div>
        {/* Content */}
        <div className="p-5 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
