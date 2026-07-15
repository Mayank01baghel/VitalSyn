import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="theme-admin dark bg-background text-on-background font-body-md antialiased min-h-screen">
      {/* Main Content Area Wrapper */}
      <div className="flex min-h-screen w-full">
        
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-surface border-r border-outline-variant hidden md:flex flex-col z-40">
           <div className="p-4 border-b border-outline-variant flex items-center gap-3 h-16 sticky top-0 bg-surface">
              <img src="/logo.png" alt="VitalSync Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              <span className="font-title-md text-title-md font-bold text-on-surface">VitalSync Admin</span>
           </div>
           <ul className="flex-1 overflow-y-auto py-4 space-y-1">
              <SidebarItem icon="dashboard" label="Overview Dashboard" to="/admin" />
              <SidebarItem icon="group" label="User Management" to="/admin/users" />
              <SidebarItem icon="article" label="Content Moderation" to="/admin/content" />
              <SidebarItem icon="notifications" label="Notifications" to="/admin/notifications" />
              <SidebarItem icon="list_alt" label="Audit Logs" to="/admin/logs" />
           </ul>
           <div className="p-4 border-t border-outline-variant bg-surface-container-low">
             <NavLink to="/dashboard" className="flex items-center text-on-surface-variant hover:text-primary transition-colors py-2">
               <span className="material-symbols-outlined text-[20px] mr-2">logout</span>
               <span className="font-body-sm font-semibold">Exit Admin Console</span>
             </NavLink>
           </div>
        </aside>

        {/* Right side: TopNavBar + Main Canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TopNavBar */}
          <header className="flex justify-end lg:justify-between items-center px-[24px] h-16 sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
            
            {/* Mobile menu button (placeholder) */}
            <div className="md:hidden flex-1">
              <button className="p-2 text-on-surface-variant">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>

            <div className="flex items-center gap-6 justify-end w-full lg:w-auto">
              {/* Trailing Actions */}
              <div className="flex items-center gap-3">
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container scale-95 active:scale-100 relative">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
                </button>
                <div className="h-6 w-px bg-outline-variant mx-2"></div>
                <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                  Live
                </span>
                <img 
                  alt="Admin Avatar" 
                  className="w-8 h-8 rounded-full border border-outline-variant object-cover ml-2 cursor-pointer" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgX_p14WcYlOj_3YnDcCyh_t-bxTgYtUIbkJrzKezHjyZwzs9PPHecuVr6nqo2emtnSYnxzL6IfGKF7lS5stivA8zhKBZfKJU-BNVsD7vui9CupRGqp1fF4GZKeHr63XArEBX4ZTqWjjMXuCOn2tn0jQk7xRwiLc93xi1W1Sd6T7t0j93jxThuJCqsHeeNtF0MYqks4CMJEQH_rDmovycdLZezePJu9G1qh1KApuGmz1jpr_vdFLOrHQ"
                />
              </div>
            </div>
          </header>

          {/* Main Canvas */}
          <main className="flex-1 p-6 lg:p-[32px] w-full overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <li>
      <NavLink 
        to={to} 
        end={to === '/admin'}
        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out ${isActive ? 'border-l-4 border-primary bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface border-l-4 border-transparent'}`}
      >
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {icon}
            </span>
            <span className="font-body-md text-body-md">{label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}
