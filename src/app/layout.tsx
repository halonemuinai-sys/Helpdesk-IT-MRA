'use client';

import './globals.css';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard, LogOut, Bell, Database, Calendar,
  Star, CheckCircle2, AlertTriangle, Clock, List,
  ChevronRight, Plus, Headset, BarChart3
} from 'lucide-react';
import { ThemeProvider } from '@/lib/theme';
import { getInitials, toRole, type UserRole } from '@/lib/role';

function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

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
  const [counts, setCounts] = useState<SidebarCounts>({
    all: 0, starred: 0, active: 0, completed: 0, breached: 0, slaRate: 0,
  });

  useEffect(() => {
    setRole(toRole(getCookie('user_role') || 'support'));
    setFullName(getCookie('user_full_name') || 'Budi Santoso');
  }, [pathname]);

  // Fetch ticket summary for sidebar badge counts & SLA indicator
  useEffect(() => {
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
  }, [pathname]);

  const initials = fullName ? getInitials(fullName) : 'IT';
  const currentFilter = searchParams?.get('filter') || 'all';
  const isTicketsPage = pathname === '/tickets';

  const handleLogout = () => {
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'user_full_name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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

  return (
    <div className="flex min-h-screen">
      {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
      <aside
        className="sidebar-shell w-[260px] bg-white border-r border-border/80 fixed left-0 top-0 h-screen flex flex-col z-[200]"
        style={{ boxShadow: '2px 0 24px rgba(15,23,42,0.04)' }}
      >
        {/* ── Logo ─────────────────────────────────── */}
        <div className="px-5 pt-6 pb-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue to-indigo flex items-center justify-center text-white shadow-lg shrink-0">
            <Headset size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-slate-800 tracking-tight leading-tight">
              IT Helpdesk
            </span>
            <span className="text-[10px] font-bold text-text-3 tracking-wide">MRA Group</span>
          </div>
        </div>

        {/* ── Main Nav ─────────────────────────────── */}
        <nav className="px-3 mb-1">
          <Link href="/" className="no-underline block">
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                pathname === '/'
                  ? 'bg-surface-2 text-blue font-bold'
                  : 'text-text-2 hover:bg-surface-2 hover:text-text'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </Link>
        </nav>

        {/* ── Ticket Filters ───────────────────────── */}
        <div className="px-3 space-y-0.5">
          {filterItems.map(item => {
            const Icon = item.icon;
            const isActive = isTicketsPage && currentFilter === item.id;
            return (
              <Link key={item.id} href={`/tickets?filter=${item.id}`} className="no-underline block">
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue text-white font-bold shadow-sm'
                      : 'text-text-2 font-semibold hover:bg-surface-2 hover:text-text'
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? 'text-white'
                        : item.id === 'breached'
                          ? 'text-rose/60'
                          : item.id === 'starred'
                            ? 'text-amber/60'
                            : ''
                    }
                  />
                  <span className="flex-1">{item.label}</span>
                  <span
                    className={`min-w-[24px] h-[20px] rounded-md text-[10px] font-black flex items-center justify-center leading-none ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-text-3'
                    }`}
                  >
                    {item.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── SLA Indicator ────────────────────────── */}
        <div className="mx-4 mt-5 p-4 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-border/60">
          <div className="text-[9px] font-extrabold text-text-3 uppercase tracking-widest mb-2.5">
            Indikator SLA
          </div>
          <div className="text-[11px] font-semibold text-text-2 leading-snug">Rasio Penyelesaian</div>
          <div className="text-3xl font-black text-blue leading-none mt-1 mb-3">
            {counts.slaRate}%
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-blue rounded-full transition-all duration-700 ease-out"
              style={{ width: `${counts.slaRate}%` }}
            />
          </div>
          <p className="text-[9px] text-text-3 leading-relaxed">
            Performa berdasarkan penyelesaian tiket tepat waktu.
          </p>
          <p className="text-[9px] text-text-3 mt-1.5 italic opacity-70">
            Data diperbarui secara real-time.
          </p>
        </div>

        {/* ── Spacer ───────────────────────────────── */}
        <div className="flex-1" />

        {/* ── Bottom Navigation ────────────────────── */}
        <div className="px-3 pb-5 space-y-0.5 border-t border-border/50 pt-3 mt-3">
          <Link href="/tickets/calendar" className="no-underline block">
            <div
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                pathname === '/tickets/calendar'
                  ? 'bg-surface-2 text-blue font-bold'
                  : 'text-text-2 hover:bg-surface-2 hover:text-text'
              }`}
            >
              <Calendar size={18} />
              <span className="flex-1">Kalender</span>
              <ChevronRight size={14} className="text-text-3 opacity-50" />
            </div>
          </Link>

          {role === 'admin' && (
            <Link href="/master-data" className="no-underline block">
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                  pathname === '/master-data'
                    ? 'bg-surface-2 text-blue font-bold'
                    : 'text-text-2 hover:bg-surface-2 hover:text-text'
                }`}
              >
                <Database size={18} />
                <span className="flex-1">Kelola & Pengaturan</span>
                <ChevronRight size={14} className="text-text-3 opacity-50" />
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <div className="flex-1 ml-[260px] min-h-screen bg-[var(--bg)]">
        {/* ── Top Header Bar ───────────────────────── */}
        <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-border/70 px-8 py-4 flex items-center justify-end gap-5">
          {/* Primary CTA */}
          <Link href="/input" className="no-underline hidden sm:block">
            <button className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue to-indigo hover:from-blue-d hover:to-indigo text-white text-xs font-extrabold rounded-xl shadow-premium hover:shadow-hover hover:-translate-y-0.5 transition-all border-none cursor-pointer">
              <Plus size={15} /> Lapor Gangguan Baru
            </button>
          </Link>

          {/* Notification Bell */}
          <div className="relative p-2 rounded-full hover:bg-surface-2 transition-colors cursor-pointer text-text-2">
            <Bell size={18} />
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">
              2
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-border/70">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-black text-slate-800 leading-none">{fullName}</span>
              <span className="text-[9px] font-bold text-text-3 mt-0.5 uppercase tracking-wider">
                {role === 'admin' ? 'Administrator' : 'IT Support'}
              </span>
            </div>
            <div className="relative group">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-indigo text-white flex items-center justify-center font-black text-xs shadow-md border-2 border-white cursor-pointer hover:shadow-lg transition-all"
                title="Menu Akun"
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
        </header>

        {/* ── Page Content ─────────────────────────── */}
        <main style={{ minHeight: 'calc(100vh - 72px)' }}>{children}</main>
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
