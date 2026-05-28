'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Ticket, BarChart3,
  LogOut, Bell, Sun, Moon, Database, Calendar, UserCheck, Plus
} from 'lucide-react';
import { ThemeProvider, useTheme } from '@/lib/theme';
import { filterMenuGroups, getInitials, toRole, type UserRole } from '@/lib/role';

// Read client side cookies
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

const menuItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Daftar Tiket', href: '/tickets', icon: Ticket },
  { label: 'Kalender Tiket', href: '/tickets/calendar', icon: Calendar },
  { label: 'Laporan Bulanan', href: '/reports', icon: BarChart3 },
  { label: 'Master Data Config', href: '/master-data', icon: Database, role: 'admin' },
];

function Shell({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [role, setRole] = useState<UserRole>('support');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const userRole = getCookie('user_role');
    const userFullName = getCookie('user_full_name');
    
    // Default to support agent if cookie not set (simple bypass for dev)
    setRole(toRole(userRole || 'support'));
    setFullName(userFullName || 'Budi Santoso');
  }, [pathname]);

  const initials = fullName ? getInitials(fullName) : 'IT';

  const handleLogout = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'user_full_name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  // Filter menu items by role
  const visibleItems = menuItems.filter(item => {
    if (item.role && item.role !== role) return false;
    return true;
  });

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <nav className="navbar border-b border-border bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-[100] backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-8">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <img 
              src="/logo-mra.png" 
              alt="MRA Logo" 
              className="w-9 h-9 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-slate-800 leading-none">
                MRA HELPDESK
              </span>
              <span className="text-[9px] font-bold text-blue tracking-wider mt-0.5 uppercase">
                IT Support System
              </span>
            </div>
          </Link>

          {/* Horizontal Menu Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 pl-6 border-l border-border/80">
            {visibleItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="no-underline">
                  <div className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    active 
                      ? 'bg-blue text-white shadow-sm' 
                      : 'text-text-2 hover:text-text hover:bg-surface-2'
                  }`}>
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Global CTA, Notification & User Profile */}
        <div className="flex items-center gap-5">
          {/* Primary CTA button + Report Issue */}
          <Link href="/input" className="no-underline hidden sm:block">
            <button className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-blue to-indigo hover:from-blue-d hover:to-indigo text-white text-xxs font-extrabold rounded-full shadow-premium hover:shadow-hover hover:-translate-y-0.5 transition-all border-none cursor-pointer">
              <Plus size={14} /> Lapor Gangguan
            </button>
          </Link>

          {/* Notification Bell */}
          <div className="relative p-2 rounded-full hover:bg-surface-2 transition-colors cursor-pointer text-text-2 flex items-center justify-center">
            <Bell size={17} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
              2
            </span>
          </div>

          {/* User Profile avatar & info */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="flex flex-col text-right hidden md:flex">
              <span className="text-xs font-black text-slate-850 leading-none">
                {fullName}
              </span>
              <span className="text-[9px] text-text-3 font-extrabold mt-1 uppercase tracking-wider">
                {role === 'admin' ? 'Administrator' : 'IT Support'}
              </span>
            </div>
            
            {/* Avatar / Logout Trigger */}
            <div className="relative group">
              <button 
                type="button"
                className="w-9 h-9 rounded-full bg-blue text-white flex items-center justify-center font-black text-xs shadow-md border-none cursor-pointer hover:bg-blue-d transition-all"
                title="Klik untuk Logout"
              >
                {initials}
              </button>
              
              {/* Dropdown Menu on hover/click */}
              <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-xl shadow-hero hidden group-focus-within:block group-hover:block z-50 py-1.5">
                <div className="px-4 py-2 border-b border-border/80 text-xxs text-text-3 font-extrabold uppercase tracking-wider">
                  Menu Akun
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-rose-light/50 hover:text-rose text-xs font-bold text-rose/95 border-none bg-transparent cursor-pointer flex items-center gap-2"
                >
                  <LogOut size={13} /> Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>MRA IT Helpdesk — Support Ticketing System</title>
      </head>
      <body>
        <ThemeProvider>
          {isLoginPage ? children : <Shell>{children}</Shell>}
        </ThemeProvider>
      </body>
    </html>
  );
}
