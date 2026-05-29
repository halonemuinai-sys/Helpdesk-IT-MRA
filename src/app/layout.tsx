'use client';

import './globals.css';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard, LogOut, Bell, Database, Calendar, Users,
  Star, CheckCircle2, AlertTriangle, Clock, List,
  ChevronRight, ChevronLeft, Plus, Headset, Menu
} from 'lucide-react';
import { ThemeProvider } from '@/lib/theme';
import { getInitials, toRole, type UserRole } from '@/lib/role';


interface SidebarCounts {
  all: number;
  starred: number;
  active: number;
  completed: number;
  breached: number;
  slaRate: number;
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<UserRole>('support');
  const [fullName, setFullName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [counts, setCounts] = useState<SidebarCounts>({
    all: 0, starred: 0, active: 0, completed: 0, breached: 0, slaRate: 0,
  });
  const isTicketsPage = pathname === '/tickets';
  const [isTicketsMenuExpanded, setIsTicketsMenuExpanded] = useState(isTicketsPage);

  useEffect(() => {
    if (pathname === '/tickets') {
      setIsTicketsMenuExpanded(true);
    }
  }, [pathname]);

  // Ambil user info dari JWT via /api/me (bukan dari cookie yang bisa dimanipulasi)
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          setRole(toRole(d.role));
          setFullName(d.fullName || '');
        }
      })
      .catch(() => {});
  }, [pathname]);

  // Close mobile sidebar on navigate
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Fetch + poll ticket summary setiap 60 detik untuk live badge count
  useEffect(() => {
    const loadCounts = () => {
      fetch('/api/tickets?limit=10000')
        .then(r => r.json())
        .then(d => {
          const list: { id: string; status: string; slaStatus: string }[] = d.data || [];
          let starredSet = new Set<string>();
          try {
            const s = localStorage.getItem('mra_starred_tickets');
            if (s) starredSet = new Set(JSON.parse(s));
          } catch {}
          const sA = list.filter(t => t.slaStatus === 'Achieved').length;
          const sB = list.filter(t => t.slaStatus === 'Breached').length;
          const sT = sA + sB;
          setCounts({
            all: list.length,
            starred: list.filter(t => starredSet.has(t.id)).length,
            active: list.filter(t => ['Open', 'In Progress', 'Pending Vendor'].includes(t.status)).length,
            completed: list.filter(t => ['Resolved', 'Closed'].includes(t.status)).length,
            breached: sB,
            slaRate: sT > 0 ? Math.round((sA / sT) * 100) : 0,
          });
        })
        .catch(() => {});
    };

    loadCounts();
    const interval = setInterval(loadCounts, 60_000);
    return () => clearInterval(interval);
  }, [pathname]);

  const initials = fullName ? getInitials(fullName) : 'IT';
  const currentFilter = searchParams?.get('filter') || 'all';

  const handleSemuaTiketClick = (e: React.MouseEvent) => {
    const isClickingActiveFilter = currentFilter === 'all';
    if (pathname === '/tickets' && isClickingActiveFilter) {
      e.preventDefault();
      setIsTicketsMenuExpanded(!isTicketsMenuExpanded);
    } else {
      setIsTicketsMenuExpanded(true);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
  };

  /* ── Sidebar filter items ────────────────────────────────── */
  const filterItems = [
    { id: 'all',       label: 'Semua Tiket',    icon: List,           count: counts.all },
    { id: 'starred',   label: 'Berbintang',     icon: Star,           count: counts.starred },
    { id: 'active',    label: 'Tiket Aktif',    icon: Clock,          count: counts.active },
    { id: 'completed', label: 'Terselesaikan',  icon: CheckCircle2,   count: counts.completed },
    { id: 'breached',  label: 'SLA Breached',   icon: AlertTriangle,  count: counts.breached },
  ];

  let staggerIndex = 0;

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''} lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Collapse Toggle Button (desktop only) */}
        <button
          className="hidden lg:flex absolute -right-4 top-10 w-8 h-8 bg-surface border border-border rounded-full items-center justify-center text-text-2 hover:text-blue hover:border-blue shadow-md transition-all z-[300] cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <ChevronLeft
            size={16}
            className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>

        {/* ── Logo ─────────────────────────────────── */}
        <div className="sidebar-logo">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue to-indigo flex items-center justify-center text-white shadow-lg shrink-0">
            <Headset size={18} />
          </div>
          <div className="sidebar-logo-text overflow-hidden whitespace-nowrap">
            <p className="text-sm font-black tracking-tight text-text leading-tight">
              IT Helpdesk
            </p>
            <p className="text-[10px] font-bold text-blue mt-0.5">MRA Group</p>
          </div>
        </div>

        {/* ── Menu ─────────────────────────────────── */}
        <nav className="sidebar-menu">
          {/* Dashboard */}
          <div
            className="sidebar-item-wrap stagger-item"
            style={{ '--stagger-delay': staggerIndex++ } as React.CSSProperties}
          >
            <Link href="/" className="block no-underline">
              <div className={`sidebar-item${pathname === '/' ? ' active' : ''}`}>
                <div className="relative flex items-center">
                  <LayoutDashboard
                    size={16}
                    className={`shrink-0 ${pathname === '/' ? 'text-blue' : 'text-text-3'}`}
                  />
                </div>
                <span className="sidebar-label flex-1">Dashboard</span>
                {pathname === '/' && (
                  <ChevronRight size={13} className="active-chevron text-blue shrink-0" />
                )}
              </div>
            </Link>
            {isCollapsed && <div className="flyout-label">Dashboard</div>}
          </div>

          {/* Section Label */}
          <p className="text-[10px] font-bold px-3.5 py-2.5 pb-1 text-text-3 uppercase tracking-wider sidebar-menu-group-label">
            Daftar Tiket
          </p>

          {/* Semua Tiket (Main Group/Item) */}
          {(() => {
            const item = filterItems[0];
            const Icon = item.icon;
            const isActive = isTicketsPage && currentFilter === item.id;
            const idx = staggerIndex++;
            return (
              <div
                className="sidebar-item-wrap stagger-item"
                style={{ '--stagger-delay': idx } as React.CSSProperties}
              >
                <Link
                  href={`/tickets?filter=${item.id}`}
                  onClick={handleSemuaTiketClick}
                  className="block no-underline"
                >
                  <div className={`sidebar-item${isActive ? ' active' : ''}`}>
                    <div className="relative flex items-center">
                      <Icon
                        size={16}
                        className={`shrink-0 ${isActive ? 'text-blue' : 'text-text-3'}`}
                      />
                    </div>
                    <span className="sidebar-label flex-1">{item.label}</span>
                    <span className="sidebar-badge">{item.count}</span>
                    <ChevronRight
                      size={13}
                      className={`transition-transform duration-200 shrink-0 ${
                        isTicketsMenuExpanded ? 'rotate-90 text-blue' : 'text-text-3'
                      }`}
                    />
                  </div>
                </Link>
                {isCollapsed && <div className="flyout-label">{item.label}</div>}
              </div>
            );
          })()}

          {/* Submenu Items (Berbintang, Aktif, Terselesaikan, SLA Breached) */}
          {isTicketsMenuExpanded && (
            <div className={`sidebar-submenu-items ${isCollapsed ? 'collapsed-submenu' : 'expanded-submenu'}`}>
              {filterItems.slice(1).map(item => {
                const Icon = item.icon;
                const isActive = isTicketsPage && currentFilter === item.id;
                const idx = staggerIndex++;
                return (
                  <div
                    key={item.id}
                    className="sidebar-item-wrap stagger-item"
                    style={{ '--stagger-delay': idx } as React.CSSProperties}
                  >
                    <Link href={`/tickets?filter=${item.id}`} className="block no-underline">
                      <div className={`sidebar-item${isActive ? ' active' : ''}`}>
                        <div className="relative flex items-center">
                          <Icon
                            size={16}
                            className={`shrink-0 ${
                              isActive
                                ? 'text-blue'
                                : item.id === 'breached'
                                  ? 'text-rose'
                                  : item.id === 'starred'
                                    ? 'text-amber'
                                    : 'text-text-3'
                            }`}
                          />
                        </div>
                        <span className="sidebar-label flex-1">{item.label}</span>
                        <span className="sidebar-badge">{item.count}</span>
                        {isActive && (
                          <ChevronRight size={13} className="active-chevron text-blue shrink-0" />
                        )}
                      </div>
                    </Link>
                    {isCollapsed && <div className="flyout-label">{item.label}</div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Section Label */}
          <p className="text-[10px] font-bold px-3.5 py-2.5 pb-1 text-text-3 uppercase tracking-wider sidebar-menu-group-label">
            Menu Lainnya
          </p>

          {/* Kalender */}
          <div
            className="sidebar-item-wrap stagger-item"
            style={{ '--stagger-delay': staggerIndex++ } as React.CSSProperties}
          >
            <Link href="/tickets/calendar" className="block no-underline">
              <div className={`sidebar-item${pathname === '/tickets/calendar' ? ' active' : ''}`}>
                <div className="relative flex items-center">
                  <Calendar
                    size={16}
                    className={`shrink-0 ${pathname === '/tickets/calendar' ? 'text-blue' : 'text-text-3'}`}
                  />
                </div>
                <span className="sidebar-label flex-1">Kalender</span>
                {pathname === '/tickets/calendar' && (
                  <ChevronRight size={13} className="active-chevron text-blue shrink-0" />
                )}
              </div>
            </Link>
            {isCollapsed && <div className="flyout-label">Kalender</div>}
          </div>

          {/* Data Karyawan (admin only) */}
          {role === 'admin' && (
            <div
              className="sidebar-item-wrap stagger-item"
              style={{ '--stagger-delay': staggerIndex++ } as React.CSSProperties}
            >
              <Link href="/employees" className="block no-underline">
                <div className={`sidebar-item${pathname === '/employees' ? ' active' : ''}`}>
                  <div className="relative flex items-center">
                    <Users
                      size={16}
                      className={`shrink-0 ${pathname === '/employees' ? 'text-blue' : 'text-text-3'}`}
                    />
                  </div>
                  <span className="sidebar-label flex-1">Data Karyawan</span>
                  {pathname === '/employees' && (
                    <ChevronRight size={13} className="active-chevron text-blue shrink-0" />
                  )}
                </div>
              </Link>
              {isCollapsed && <div className="flyout-label">Data Karyawan</div>}
            </div>
          )}

          {/* Kelola & Pengaturan (admin only) */}
          {role === 'admin' && (
            <div
              className="sidebar-item-wrap stagger-item"
              style={{ '--stagger-delay': staggerIndex++ } as React.CSSProperties}
            >
              <Link href="/master-data" className="block no-underline">
                <div className={`sidebar-item${pathname === '/master-data' ? ' active' : ''}`}>
                  <div className="relative flex items-center">
                    <Database
                      size={16}
                      className={`shrink-0 ${pathname === '/master-data' ? 'text-blue' : 'text-text-3'}`}
                    />
                  </div>
                  <span className="sidebar-label flex-1">Kelola & Pengaturan</span>
                  {pathname === '/master-data' && (
                    <ChevronRight size={13} className="active-chevron text-blue shrink-0" />
                  )}
                </div>
              </Link>
              {isCollapsed && <div className="flyout-label">Kelola & Pengaturan</div>}
            </div>
          )}
        </nav>

        {/* ── Footer ──────────────────────────────── */}
        <div className="sidebar-footer">
          {/* Logout */}
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

          <p className="text-[9px] text-text-3 text-center mt-2 leading-normal opacity-60 sidebar-label">
            © 2026 MRA Group
          </p>
        </div>
      </aside>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Top Navbar */}
        <nav className="navbar">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1.5 -ml-2 text-text-2 hover:bg-surface-2 rounded-md border-none bg-transparent cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="nav-right ml-auto">
            {/* Primary CTA */}
            <Link href="/input" className="no-underline hidden sm:block">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue to-indigo hover:from-blue-d hover:to-indigo text-white text-[11px] font-extrabold rounded-xl shadow-premium hover:shadow-hover hover:-translate-y-0.5 transition-all border-none cursor-pointer">
                <Plus size={14} /> Lapor Gangguan
              </button>
            </Link>

            {/* Notification Bell — live SLA Breached count */}
            <Link href="/tickets?filter=breached" className="no-underline">
              <div className="relative p-1.5 rounded-full hover:bg-surface-2 transition-colors cursor-pointer text-text-2" title={counts.breached > 0 ? `${counts.breached} tiket SLA Breached` : 'Tidak ada tiket breached'}>
                <Bell size={17} className={counts.breached > 0 ? 'text-rose' : ''} />
                {counts.breached > 0 && (
                  <span className="absolute top-0 right-0 min-w-[14px] h-3.5 bg-rose text-white text-[7px] font-black rounded-full flex items-center justify-center border-2 border-white px-0.5">
                    {counts.breached > 99 ? '99+' : counts.breached}
                  </span>
                )}
              </div>
            </Link>

            {/* User Profile */}
            <div className="relative group">
              <button
                type="button"
                className="nav-avatar"
                aria-label="User Avatar"
                title={fullName || role}
              >
                {initials}
              </button>
              <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-xl shadow-hero hidden group-hover:block group-focus-within:block z-50 py-1.5">
                <div className="px-4 py-2.5 border-b border-border/80">
                  <div className="text-xs font-black text-slate-800">{fullName}</div>
                  <div className="text-[9px] text-text-3 font-bold mt-0.5 uppercase tracking-wider">
                    {role === 'admin' ? 'Administrator' : 'IT Support'}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 hover:bg-rose-light/50 hover:text-rose text-xs font-bold text-rose/90 border-none bg-transparent cursor-pointer flex items-center gap-2 mt-0.5"
                >
                  <LogOut size={13} /> Log Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ShellInner>{children}</ShellInner>
    </Suspense>
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>MRA IT Helpdesk — Support Ticketing System</title>
      </head>
      <body>
        <ThemeProvider>{isLoginPage ? children : <Shell>{children}</Shell>}</ThemeProvider>
      </body>
    </html>
  );
}
