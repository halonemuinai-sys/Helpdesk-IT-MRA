'use client';

import './globals.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Headset, Ticket, BarChart3,
  Settings, LogOut, Bell, ChevronRight, ChevronLeft, Sun, Moon, Menu, X, Database
} from 'lucide-react';
import { ThemeProvider, useTheme } from '@/lib/theme';
import { filterMenuGroups, getInitials, toRole, type UserRole } from '@/lib/role';

const menuGroups = [
  {
    label: 'OVERVIEW',
    items: [{ icon: LayoutDashboard, label: 'Dashboard', href: '/' }],
  },
  {
    label: 'TICKETS',
    items: [
      { icon: Headset, label: 'Lapor Gangguan IT', href: '/input' },
      { icon: Ticket,  label: 'Daftar Tiket',      href: '/tickets' },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { icon: BarChart3, label: 'Laporan Bulanan', href: '/reports' },
    ],
  },
  {
    label: 'ADMIN',
    items: [
      { icon: Database, label: 'Master Data Config', href: '/master-data' },
    ],
  },
];

function ThemeTogglePill() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="theme-toggle-pill"
    >
      <div className="theme-track">
        <div className="theme-thumb">
          {dark
            ? <Moon size={10} className="text-blue" strokeWidth={2.5} />
            : <Sun  size={10} className="text-amber" strokeWidth={2.5} />
          }
        </div>
      </div>
      <span className="text-sm font-semibold text-text-2">
        {dark ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
}

function NavThemeBtn() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="p-1.5 rounded-lg hover:bg-surface-2 transition-colors"
    >
      {dark ? <Sun size={17} className="text-text-2" /> : <Moon size={17} className="text-text-2" />}
    </button>
  );
}

// Read client side cookies
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState<UserRole>('support');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const userRole = getCookie('user_role');
    const userFullName = getCookie('user_full_name');
    
    // Default to support agent if cookie not set (simple bypass for dev)
    setRole(toRole(userRole || 'support'));
    setFullName(userFullName || 'IT Agent Support');
  }, [pathname]);

  const initials = fullName ? getInitials(fullName) : 'IT';
  const visibleGroups = filterMenuGroups(menuGroups, role);

  const handleLogout = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'user_full_name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  let staggerIndex = 0;

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''} lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="hidden lg:flex absolute -right-4 top-10 w-8 h-8 bg-surface border border-border rounded-full items-center justify-center text-text-2 hover:text-blue hover:border-blue shadow-md transition-all z-[300] cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronLeft size={16} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        <div className="sidebar-logo">
          <div className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-white font-black text-sm shrink-0">M</div>
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm font-black tracking-tight text-text leading-tight">
              MRA Helpdesk
            </p>
            <p className="text-[10px] font-bold text-blue mt-0.5">
              IT Support System
            </p>
          </div>
        </div>

        <nav className="sidebar-menu">
          {visibleGroups.map((group) => (
            <div key={group.label} className="mb-1">
              <p className="text-[10px] font-bold px-3.5 py-2.5 pb-1 text-text-3 uppercase tracking-wider sidebar-menu-group-label">
                {group.label}
              </p>
              {group.items.map((item) => {
                const active = pathname === item.href;
                const currentIndex = staggerIndex++;
                return (
                  <div 
                    key={item.href} 
                    className="sidebar-item-wrap stagger-item"
                    style={{ '--stagger-delay': currentIndex } as React.CSSProperties}
                  >
                    <Link href={item.href} className="block no-underline">
                      <div className={`sidebar-item${active ? ' active' : ''}`}>
                        <div className="relative flex items-center">
                          <item.icon size={16} className={`shrink-0 ${active ? 'text-blue' : 'text-text-3'}`} />
                        </div>
                        <span className="sidebar-label flex-1">{item.label}</span>
                        {active && <ChevronRight size={13} className="text-blue shrink-0 opacity-60" />}
                      </div>
                    </Link>
                    {isCollapsed && <div className="flyout-label">{item.label}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <ThemeTogglePill />
          <div className="h-2" />
          <div 
            className="sidebar-item-wrap stagger-item"
            style={{ '--stagger-delay': staggerIndex++ } as React.CSSProperties}
          >
            <button 
              type="button" 
              className="sidebar-item text-rose w-full text-left bg-transparent border-none font-inherit outline-none" 
              onClick={handleLogout}
            >
              <div className="relative flex items-center">
                <LogOut size={15} className="shrink-0 text-rose" />
              </div>
              <span className="sidebar-label flex-1">Logout</span>
            </button>
            {isCollapsed && <div className="flyout-label">Logout</div>}
          </div>
          <p className="text-[9px] text-text-3 text-center mt-2.5 leading-normal opacity-60">
            © 2026 MRA Group
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <nav className="navbar">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-1.5 -ml-2 text-text-2 hover:bg-surface-2 rounded-md"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="nav-right ml-auto">
            <NavThemeBtn />
            <div className="nav-avatar" aria-label="User Avatar" title={fullName || role}>{initials}</div>
          </div>
        </nav>
        <main>{children}</main>
      </div>
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
