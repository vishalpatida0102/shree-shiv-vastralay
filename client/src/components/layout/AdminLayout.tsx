import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, Bell } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div id="admin-main" style={{ minHeight: '100vh' }}>
        <style>{`
          @media (min-width: 1024px) {
            #admin-main { margin-left: 250px; }
          }
        `}</style>

        {/* Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          padding: '0 20px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
        }}>
          {/* Left: Hamburger + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Menu size={18} style={{ color: '#555' }} />
            </div>
            <h1 style={{ fontSize: '17px', fontWeight: '600', color: '#333', margin: 0 }}>
              {title}
            </h1>
          </div>

          {/* Right: Notification + Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Bell size={18} style={{ color: '#555' }} />
              <div style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#d35400',
                border: '1.5px solid #fff',
              }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d35400, #e67e22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700' }}>A</span>
              </div>
              <span className="hidden sm:block" style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>
                एडमिन
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
