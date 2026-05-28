'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  RotateCw, Search, PenSquare, X, Save, Loader2, Calendar,
  MoreVertical, Star, CheckCircle2, AlertTriangle, List, 
  Clock, Users, Trash2, Check, Plus, FolderOpen, AlertCircle,
  Filter, ChevronDown, RefreshCw
} from 'lucide-react';
import { Badge, FormError, DatePickerPremium } from '@/components/PageShared';
import Link from 'next/link';

interface Ticket {
  id: string;
  reporterName: string;
  ticketSource: string;
  ticketDate: string;
  ticketTime: string;
  location: string;
  category: string;
  issueTitle: string;
  description: string;
  priority: string;
  status: string;
  responseDate: string;
  responseTime: string;
  resolvedDate: string;
  resolvedTime: string;
  slaStatus: string;
  impactLevel: string;
}

interface DropdownItem {
  id: number;
  category: string;
  value: string;
}

function SlaProgressCircle({ status, value }: { status: string; value?: number }) {
  if (status !== 'Achieved' && status !== 'Breached') {
    return (
      <div className="w-8 h-8 rounded-full border border-border/80 flex items-center justify-center text-text-3 font-bold text-[10px]">
        —
      </div>
    );
  }

  const color = status === 'Achieved' ? 'stroke-emerald text-emerald' : 'stroke-rose text-rose';
  const percentage = value || (status === 'Achieved' ? 100 : 0);
  const strokeDashoffset = 75.4 - (75.4 * percentage) / 100;

  return (
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <svg className="w-8 h-8 transform -rotate-90">
        <circle
          cx="16"
          cy="16"
          r="12"
          className="stroke-slate-100 dark:stroke-slate-800/40"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx="16"
          cy="16"
          r="12"
          className={color}
          strokeWidth="2.5"
          fill="transparent"
          strokeDasharray="75.4"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[8px] font-black text-text-2 leading-none">
        {percentage}%
      </span>
    </div>
  );
}

function getAvatarBgColor(name: string): string {
  if (!name) return 'bg-slate-100 text-slate-500';
  const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  const colors = [
    'bg-blue-light text-blue dark:bg-blue/15 dark:text-blue-d',
    'bg-emerald-light text-emerald dark:bg-emerald/15 dark:text-emerald',
    'bg-amber-light text-amber dark:bg-amber/15 dark:text-amber',
    'bg-rose-light text-rose dark:bg-rose/15 dark:text-rose',
    'bg-indigo-light text-indigo dark:bg-indigo/15 dark:text-indigo'
  ];
  return colors[charCode % colors.length];
}

function getInitials(name: string): string {
  if (!name) return 'IT';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function TicketsListPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('all'); // 'all' | 'starred' | 'active' | 'completed' | 'breached'
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  // Additional fine filters
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const [counts, setCounts] = useState<Record<string, number>>({
    all: 0, Open: 0, InProgress: 0, PendingVendor: 0, Resolved: 0, Closed: 0
  });

  // Starred tickets persistence (LocalStorage)
  const [starredTickets, setStarredTickets] = useState<Set<string>>(new Set());

  // Checkbox selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Row dropdown action menu state
  const [activeRowMenuId, setActiveRowMenuId] = useState<string | null>(null);

  // Edit ticket modal states
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editSla, setEditSla] = useState('');
  const [editResponseDate, setEditResponseDate] = useState('');
  const [editResponseTime, setEditResponseTime] = useState('');
  const [editResolvedDate, setEditResolvedDate] = useState('');
  const [editResolvedTime, setEditResolvedTime] = useState('');
  const [editImpact, setEditImpact] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [impacts, setImpacts] = useState<DropdownItem[]>([]);

  // Load Starred states on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mra_starred_tickets');
      if (stored) {
        setStarredTickets(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error('Failed to load starred state:', e);
    }
  }, []);

  const fetchTicketsData = () => {
    setLoading(true);
    // Fetch all tickets once to perform fast local query filtering, matching Google Apps Script speed
    fetch('/api/tickets?limit=10000')
      .then(res => res.json())
      .then(d => {
        const list: Ticket[] = d.data || [];
        setAllTickets(list);

        // Update counts
        const c = {
          all: list.length,
          Open: list.filter(t => t.status === 'Open').length,
          InProgress: list.filter(t => t.status === 'In Progress').length,
          PendingVendor: list.filter(t => t.status === 'Pending Vendor').length,
          Resolved: list.filter(t => t.status === 'Resolved').length,
          Closed: list.filter(t => t.status === 'Closed').length,
        };
        setCounts(c);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tickets:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTicketsData();

    fetch('/api/master-data?category=HD_Dampak')
      .then(res => res.json())
      .then(d => setImpacts(d.data || []))
      .catch(err => console.error('Error loading impacts:', err));
  }, []);

  const openDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEditStatus(ticket.status);
    setEditSla(ticket.slaStatus || '');
    setEditResponseDate(ticket.responseDate || '');
    setEditResponseTime(ticket.responseTime || '');
    setEditResolvedDate(ticket.resolvedDate || '');
    setEditResolvedTime(ticket.resolvedTime || '');
    setEditImpact(ticket.impactLevel || '');
    setSaveError('');
  };

  const closeDetail = () => {
    setSelectedTicket(null);
  };

  const handleStatusChange = (statusVal: string) => {
    setEditStatus(statusVal);
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const time = `${hh}:${mm}`;

    if (statusVal === 'In Progress') {
      if (!editResponseDate) setEditResponseDate(today);
      if (!editResponseTime) setEditResponseTime(time);
    } else if (statusVal === 'Resolved' || statusVal === 'Closed') {
      if (!editResponseDate) {
        setEditResponseDate(today);
        setEditResponseTime(time);
      }
      if (!editResolvedDate) setEditResolvedDate(today);
      if (!editResolvedTime) setEditResolvedTime(time);
      if (!editSla) setEditSla('Achieved');
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setSaving(true);
    setSaveError('');

    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          slaStatus: editSla,
          responseDate: editResponseDate,
          responseTime: editResponseTime,
          resolvedDate: editResolvedDate,
          resolvedTime: editResolvedTime,
          impactLevel: editImpact
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update ticket');
      }

      closeDetail();
      fetchTicketsData();
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Direct status update from row action menu
  const handleUpdateStatusDirect = async (id: string, newStatus: string) => {
    setActiveRowMenuId(null);
    setLoading(true);
    try {
      const ticket = allTickets.find(t => t.id === id);
      if (!ticket) return;

      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const time = `${hh}:${mm}`;

      let updateBody: any = {
        status: newStatus,
        slaStatus: ticket.slaStatus,
        responseDate: ticket.responseDate,
        responseTime: ticket.responseTime,
        resolvedDate: ticket.resolvedDate,
        resolvedTime: ticket.resolvedTime,
        impactLevel: ticket.impactLevel
      };

      if (newStatus === 'In Progress') {
        if (!ticket.responseDate) {
          updateBody.responseDate = today;
          updateBody.responseTime = time;
        }
      } else if (newStatus === 'Resolved' || newStatus === 'Closed') {
        if (!ticket.responseDate) {
          updateBody.responseDate = today;
          updateBody.responseTime = time;
        }
        if (!ticket.resolvedDate) {
          updateBody.resolvedDate = today;
          updateBody.resolvedTime = time;
        }
        if (!ticket.slaStatus) {
          updateBody.slaStatus = 'Achieved';
        }
      }

      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateBody)
      });

      if (!res.ok) {
        throw new Error('Gagal memperbarui status tiket.');
      }
      fetchTicketsData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Direct delete from row action menu
  const handleDeleteDirect = async (id: string) => {
    setActiveRowMenuId(null);
    if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Gagal menghapus tiket.');
      }
      fetchTicketsData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Starred state
  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredTickets(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('mra_starred_tickets', JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error('Failed to save starred status:', e);
      }
      return next;
    });
  };

  // Checkbox interactions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const visibleIds = paginatedTickets.map(t => t.id);
      setSelectedIds(new Set(visibleIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Bulk operations
  const handleBulkStatusUpdate = async (statusVal: string) => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const time = `${hh}:${mm}`;

      const promises = Array.from(selectedIds).map(async (id) => {
        const ticket = allTickets.find(t => t.id === id);
        if (!ticket) return;

        let updateBody: any = {
          status: statusVal,
          slaStatus: ticket.slaStatus,
          responseDate: ticket.responseDate,
          responseTime: ticket.responseTime,
          resolvedDate: ticket.resolvedDate,
          resolvedTime: ticket.resolvedTime,
          impactLevel: ticket.impactLevel
        };

        if (statusVal === 'In Progress') {
          if (!ticket.responseDate) {
            updateBody.responseDate = today;
            updateBody.responseTime = time;
          }
        } else if (statusVal === 'Resolved' || statusVal === 'Closed') {
          if (!ticket.responseDate) {
            updateBody.responseDate = today;
            updateBody.responseTime = time;
          }
          if (!ticket.resolvedDate) {
            updateBody.resolvedDate = today;
            updateBody.resolvedTime = time;
          }
          if (!ticket.slaStatus) {
            updateBody.slaStatus = 'Achieved';
          }
        }

        await fetch(`/api/tickets/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateBody)
        });
      });

      await Promise.all(promises);
      setSelectedIds(new Set());
      fetchTicketsData();
    } catch (e) {
      console.error('Error bulk updating status:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.size} tiket yang dipilih secara masal?`)) return;
    setLoading(true);
    try {
      const promises = Array.from(selectedIds).map(async (id) => {
        await fetch(`/api/tickets/${id}`, {
          method: 'DELETE'
        });
      });
      await Promise.all(promises);
      setSelectedIds(new Set());
      fetchTicketsData();
    } catch (e) {
      console.error('Error bulk deleting tickets:', e);
    } finally {
      setLoading(false);
    }
  };

  // Perform client-side filtering matching the Google App Script feel
  const filteredTickets = allTickets.filter(t => {
    // 1. Navigation side filters
    if (activeNav === 'starred') {
      if (!starredTickets.has(t.id)) return false;
    } else if (activeNav === 'active') {
      if (!['Open', 'In Progress', 'Pending Vendor'].includes(t.status)) return false;
    } else if (activeNav === 'completed') {
      if (!['Resolved', 'Closed'].includes(t.status)) return false;
    } else if (activeNav === 'breached') {
      if (t.slaStatus !== 'Breached') return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch = (
        t.id.toLowerCase().includes(q) ||
        t.reporterName.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.issueTitle.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
      if (!matchSearch) return false;
    }

    // 3. Priority filter
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;

    // 4. Category filter
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

    // 5. Location filter
    if (locationFilter !== 'all' && !t.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;

    return true;
  });

  const paginatedTickets = filteredTickets.slice(offset, offset + limit);
  const totalCount = filteredTickets.length;

  // Colors & mappings
  const priorityColors: Record<string, string> = {
    'Low': 'badge-slate',
    'Medium': 'badge-amber',
    'High': 'badge-rose',
    'Critical': 'badge-rose animate-pulse'
  };

  const statusColors: Record<string, string> = {
    'Open': 'badge-rose',
    'In Progress': 'badge-blue',
    'Pending Vendor': 'badge-amber',
    'Resolved': 'badge-emerald',
    'Closed': 'badge-slate'
  };

  const slaColors: Record<string, string> = {
    'Achieved': 'badge-emerald',
    'Breached': 'badge-rose'
  };

  const impactColors: Record<string, string> = {
    'Sistem Down': 'badge-rose',
    'Sistem Lambat': 'badge-amber',
    'Beroperasi Normal': 'badge-emerald'
  };

  const navItems = [
    { id: 'all', label: 'Semua Tiket', icon: List, count: allTickets.length },
    { id: 'starred', label: 'Berbintang', icon: Star, count: allTickets.filter(t => starredTickets.has(t.id)).length, colorClass: 'text-amber fill-amber' },
    { id: 'active', label: 'Tiket Aktif', icon: Clock, count: allTickets.filter(t => ['Open', 'In Progress', 'Pending Vendor'].includes(t.status)).length },
    { id: 'completed', label: 'Terselesaikan', icon: CheckCircle2, count: allTickets.filter(t => ['Resolved', 'Closed'].includes(t.status)).length },
    { id: 'breached', label: 'SLA Breached', icon: AlertTriangle, count: allTickets.filter(t => t.slaStatus === 'Breached').length, colorClass: 'text-rose' },
  ];

  // Extract unique categories & locations for dropdown filter chips
  const uniqueCategories = Array.from(new Set(allTickets.map(t => t.category))).filter(Boolean);
  const uniqueLocations = Array.from(new Set(allTickets.map(t => {
    const parts = t.location.split(' ');
    return parts[0] || t.location;
  }))).filter(Boolean);

  const activeTicketsCount = counts.Open + counts.InProgress + counts.PendingVendor;
  const slaBreachedCount = allTickets.filter(t => t.slaStatus === 'Breached').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight flex items-center gap-2">
            IT Helpdesk Ticket Registry
          </h1>
          <p className="text-xs text-text-3 font-semibold mt-1">
            Kelola dan pantau status antrean gangguan IT MRA Group dengan performa SLA premium.
          </p>
        </div>
      </div>

      {/* 2. KPI Cards Dashboard (Top) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Tickets */}
        <div className="card p-4.5 bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 hover:border-blue-border/40 hover:shadow-premium transition-all rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-text-3 uppercase tracking-wider block">Total Tiket</span>
            <span className="text-2.5xl font-black text-slate-850 dark:text-slate-100">{counts.all}</span>
            <span className="text-[10px] text-text-3 font-medium block">Semua tiket masuk</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-light dark:bg-blue/10 text-blue flex items-center justify-center shrink-0 shadow-sm">
            <List size={18} />
          </div>
        </div>

        {/* Active Ticket */}
        <div className="card p-4.5 bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 hover:border-amber-border/40 hover:shadow-premium transition-all rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-text-3 uppercase tracking-wider block">Tiket Aktif</span>
            <span className="text-2.5xl font-black text-amber">{activeTicketsCount}</span>
            <span className="text-[10px] text-text-3 font-medium block">Sedang diproses</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-light dark:bg-amber/10 text-amber flex items-center justify-center shrink-0 shadow-sm">
            <Clock size={18} />
          </div>
        </div>

        {/* Resolved */}
        <div className="card p-4.5 bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 hover:border-emerald-border/40 hover:shadow-premium transition-all rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-text-3 uppercase tracking-wider block">Terselesaikan</span>
            <span className="text-2.5xl font-black text-emerald">{counts.Resolved + counts.Closed}</span>
            <span className="text-[10px] text-text-3 font-medium block">Penyelesaian sukses</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-light dark:bg-emerald/10 text-emerald flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* SLA Breached */}
        <div className="card p-4.5 bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 hover:border-rose-border/40 hover:shadow-premium transition-all rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-text-3 uppercase tracking-wider block">SLA Breached</span>
            <span className="text-2.5xl font-black text-rose">{slaBreachedCount}</span>
            <span className="text-[10px] text-text-3 font-medium block">Butuh perhatian</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-light dark:bg-rose/10 text-rose flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle size={18} />
          </div>
        </div>
      </div>

      {/* 3. Ticket Filter Navigation Segmented Tabs (Horizontal) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 pb-3 border-b border-border/50">
        {/* Horizontal Navigation Pills */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl gap-0.5 self-start overflow-x-auto max-w-full">
          {navItems.map(item => {
            const active = activeNav === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveNav(item.id); setOffset(0); setSelectedIds(new Set()); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all border-none cursor-pointer shrink-0 ${
                  active 
                    ? 'bg-white dark:bg-slate-800 text-blue shadow-sm' 
                    : 'text-text-2 hover:text-text bg-transparent'
                }`}
              >
                <Icon size={14} className={active ? 'text-blue' : item.colorClass || 'text-text-3'} />
                <span>{item.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black leading-none ${
                  active ? 'bg-blue text-white' : 'bg-slate-200 dark:bg-slate-800 text-text-3'
                }`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Primary CTA + Lapor Gangguan Baru */}
        <Link href="/input" className="no-underline">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue to-indigo hover:from-blue-d hover:to-indigo text-white text-xs font-extrabold rounded-full shadow-premium hover:shadow-hover hover:-translate-y-0.5 transition-all border-none cursor-pointer">
            <Plus size={16} /> Lapor Gangguan Baru
          </button>
        </Link>
      </div>

      {/* 4. Search & Filter Area */}
      <div className="card p-4 bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex items-center w-full max-w-md">
            <Search className="absolute left-3.5 w-4 h-4 text-text-3" />
            <input
              type="text"
              placeholder="Cari ID, pelapor, lokasi, kategori, atau masalah..."
              className="input-premium pl-10 pr-4 py-2.5 w-full text-xs bg-slate-50 dark:bg-slate-800/40 border-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-blue/40 rounded-full transition-all"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setOffset(0); }}
            />
          </div>

          {/* Quick operations */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              onClick={fetchTicketsData}
              title="Muat Ulang"
              className="btn p-2 rounded-full border border-border bg-surface hover:bg-surface-2 text-text-2 hover:text-blue shrink-0 flex items-center justify-center w-9 h-9 cursor-pointer"
            >
              <RotateCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
            <Link href="/tickets/calendar" className="no-underline shrink-0">
              <span className="btn border border-border bg-surface hover:bg-surface-2 py-2 px-4 text-xs flex items-center gap-1.5 rounded-full font-bold cursor-pointer text-text-2">
                <Calendar size={13} className="text-blue" /> Tampilan Kalender
              </span>
            </Link>
          </div>
        </div>

        {/* Dropdown Filters Line */}
        <div className="flex items-center gap-3 flex-wrap border-t border-border/40 pt-3 text-xs">
          <div className="flex items-center gap-1 text-text-3 font-extrabold text-[10px] uppercase tracking-wider">
            <Filter size={12} /> Filter:
          </div>

          {/* Priority dropdown chip */}
          <div className="relative flex items-center gap-1 bg-slate-50 dark:bg-slate-800/40 border border-border/60 dark:border-border/10 rounded-full px-3 py-1 cursor-pointer">
            <span className="text-[10px] font-bold text-text-3">Prioritas:</span>
            <select
              title="Filter Prioritas"
              className="bg-transparent border-none py-0 text-xs font-bold text-text cursor-pointer outline-none focus:ring-0 w-auto pr-0"
              style={{ backgroundImage: 'none', paddingRight: '2px' }}
              value={priorityFilter}
              onChange={e => { setPriorityFilter(e.target.value); setOffset(0); }}
            >
              <option value="all">Semua</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Category dropdown chip */}
          <div className="relative flex items-center gap-1 bg-slate-50 dark:bg-slate-800/40 border border-border/60 dark:border-border/10 rounded-full px-3 py-1 cursor-pointer">
            <span className="text-[10px] font-bold text-text-3">Kategori:</span>
            <select
              title="Filter Kategori"
              className="bg-transparent border-none py-0 text-xs font-bold text-text cursor-pointer outline-none focus:ring-0 w-auto pr-0"
              style={{ backgroundImage: 'none', paddingRight: '2px' }}
              value={categoryFilter}
              onChange={e => { setCategoryFilter(e.target.value); setOffset(0); }}
            >
              <option value="all">Semua</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location dropdown chip */}
          <div className="relative flex items-center gap-1 bg-slate-50 dark:bg-slate-800/40 border border-border/60 dark:border-border/10 rounded-full px-3 py-1 cursor-pointer">
            <span className="text-[10px] font-bold text-text-3">Lokasi:</span>
            <select
              title="Filter Lokasi"
              className="bg-transparent border-none py-0 text-xs font-bold text-text cursor-pointer outline-none focus:ring-0 w-auto pr-0"
              style={{ backgroundImage: 'none', paddingRight: '2px' }}
              value={locationFilter}
              onChange={e => { setLocationFilter(e.target.value); setOffset(0); }}
            >
              <option value="all">Semua</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {(priorityFilter !== 'all' || categoryFilter !== 'all' || locationFilter !== 'all' || searchQuery.trim() !== '') && (
            <button
              onClick={() => {
                setPriorityFilter('all');
                setCategoryFilter('all');
                setLocationFilter('all');
                setSearchQuery('');
                setOffset(0);
              }}
              className="text-xxs font-black text-rose hover:text-rose-d border-none bg-transparent cursor-pointer ml-auto uppercase tracking-wider flex items-center gap-1"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* 5. Bulk Actions Slide-Down Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between px-6 py-3 bg-blue-light/50 border border-blue-border/40 rounded-2xl animate-slide-up text-xs font-extrabold text-blue dark:bg-blue/5">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIds.size === paginatedTickets.length && paginatedTickets.length > 0}
              ref={el => {
                if (el) {
                  el.indeterminate = selectedIds.size > 0 && selectedIds.size < paginatedTickets.length;
                }
              }}
              onChange={handleSelectAll}
              className="w-4 h-4 text-blue border-border rounded cursor-pointer accent-blue"
            />
            <span>{selectedIds.size} tiket terpilih</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleBulkStatusUpdate('In Progress')}
              className="px-3.5 py-1.5 bg-blue hover:bg-blue-d text-white rounded-full text-xxs font-extrabold cursor-pointer border-none"
            >
              Proses (In Progress)
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Resolved')}
              className="px-3.5 py-1.5 bg-emerald hover:bg-emerald/90 text-white rounded-full text-xxs font-extrabold cursor-pointer border-none"
            >
              Selesaikan (Resolved)
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3.5 py-1.5 bg-rose hover:bg-rose/90 text-white rounded-full text-xxs font-extrabold cursor-pointer border-none flex items-center gap-1"
            >
              <Trash2 size={11} /> Hapus Masal
            </button>
          </div>
        </div>
      )}

      {/* 6. Ticket Table Card-Table Hybrid */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[1050px] space-y-3 pb-6">
          
          {/* Card Table Header */}
          <div className="grid grid-cols-[40px_35px_1.5fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_1fr_50px] gap-4 px-6 py-2.5 text-[10px] font-extrabold text-text-3 uppercase tracking-wider border-b border-border/40">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                checked={selectedIds.size === paginatedTickets.length && paginatedTickets.length > 0} 
                onChange={handleSelectAll} 
                className="w-4 h-4 cursor-pointer accent-blue" 
                title="Pilih semua"
              />
            </div>
            <div className="flex items-center justify-center"><Star size={13} className="text-text-3 fill-none" /></div>
            <div>Tiket & Judul Masalah</div>
            <div>Pelapor & Lokasi</div>
            <div>Kategori</div>
            <div>Prioritas</div>
            <div>Status</div>
            <div>SLA</div>
            <div>Waktu Lapor</div>
            <div className="text-right">Aksi</div>
          </div>

          {/* Cards List Body */}
          {loading ? (
            <div className="bg-white dark:bg-slate-900 border border-border/60 dark:border-border/10 rounded-2xl p-16 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-border border-t-blue rounded-full animate-spin" />
              <p className="text-xs text-text-3 font-semibold">Memuat aduan helpdesk...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-border/60 dark:border-border/10 rounded-2xl p-20 text-center flex flex-col items-center justify-center">
              <FolderOpen className="w-12 h-12 text-text-3 opacity-30 mb-4" />
              <p className="text-sm font-bold text-text-2">Antrean Tiket Kosong</p>
              <p className="text-xs text-text-3 mt-1">Tidak ada tiket yang terdaftar untuk kriteria filter ini.</p>
            </div>
          ) : (
            paginatedTickets.map(t => {
              const isSelectedRow = selectedIds.has(t.id);
              const isStarredRow = starredTickets.has(t.id);
              const initials = getInitials(t.reporterName);
              const avatarColor = getAvatarBgColor(t.reporterName);
              const isFinished = t.status === 'Resolved' || t.status === 'Closed';

              return (
                <div
                  key={t.id}
                  onClick={() => openDetail(t)}
                  className={`grid grid-cols-[40px_35px_1.5fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_1fr_50px] gap-4 items-center bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 rounded-2xl p-4.5 shadow-sm hover:shadow-premium hover:border-blue-border/40 transition-all duration-200 cursor-pointer ${
                    isSelectedRow ? 'ring-1 ring-blue/30 bg-blue-light/5 dark:bg-blue/5' : ''
                  } ${isFinished ? 'opacity-65' : ''}`}
                >
                  {/* Select row checkbox */}
                  <div onClick={e => e.stopPropagation()} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelectedRow}
                      onChange={(e) => toggleSelectRow(t.id, e as any)}
                      className="w-4 h-4 cursor-pointer accent-blue"
                      title="Pilih tiket"
                    />
                  </div>

                  {/* Toggle Star button */}
                  <div onClick={e => toggleStar(t.id, e)} className="flex items-center justify-center">
                    <button 
                      type="button" 
                      title={isStarredRow ? 'Hapus bintang' : 'Bintangi'}
                      className="bg-transparent border-none p-0 outline-none cursor-pointer flex items-center justify-center"
                    >
                      <Star 
                        size={15} 
                        className={`transition-transform duration-200 hover:scale-125 ${
                          isStarredRow 
                            ? 'text-amber fill-amber' 
                            : 'text-text-3 hover:text-amber fill-none'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* ID & Title */}
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-text-2 text-[10px] font-mono leading-none mb-1">{t.id}</div>
                    <div className="font-black text-xs text-slate-850 dark:text-slate-100 truncate" title={t.issueTitle}>
                      {t.issueTitle}
                    </div>
                  </div>

                  {/* Reporter avatar circle + name + location */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center font-extrabold text-[10px] shrink-0 shadow-inner`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-slate-800 dark:text-slate-100 text-xs truncate leading-snug">{t.reporterName}</div>
                      <div className="text-[9.5px] text-text-3 font-semibold truncate mt-0.5" title={t.location}>{t.location}</div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="text-xs font-semibold text-text-2 truncate">{t.category}</div>

                  {/* Priority badge */}
                  <div>
                    <Badge label={t.priority} colorClass={priorityColors[t.priority]} />
                  </div>

                  {/* Status badge */}
                  <div>
                    <Badge label={t.status} colorClass={statusColors[t.status]} />
                  </div>

                  {/* SLA progress circle */}
                  <div>
                    <SlaProgressCircle 
                      status={t.slaStatus} 
                      value={t.slaStatus === 'Achieved' ? 100 : t.slaStatus === 'Breached' ? 0 : undefined} 
                    />
                  </div>

                  {/* Waktu Lapor */}
                  <div>
                    <div className="font-bold text-text-2 text-xxs leading-snug">{t.ticketDate}</div>
                    <div className="text-[9px] text-text-3 font-semibold mt-0.5 leading-none">{t.ticketTime}</div>
                  </div>

                  {/* Row Action popover dropdown trigger */}
                  <div onClick={e => e.stopPropagation()} className="relative text-right">
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => setActiveRowMenuId(activeRowMenuId === t.id ? null : t.id)}
                        className="btn-icon bg-surface-2 border-none hover:bg-slate-200/80 dark:hover:bg-slate-800 text-text-2 p-1.5 rounded-full flex items-center justify-center cursor-pointer shadow-sm"
                        title="Menu aksi"
                      >
                        <MoreVertical size={14} />
                      </button>
                      
                      {/* Apps Script Context dropdown menu */}
                      {activeRowMenuId === t.id && (
                        <>
                          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setActiveRowMenuId(null)} />
                          <div className="absolute right-0 mt-8 w-44 rounded-xl border border-border/80 bg-surface shadow-hero z-50 py-1.5 text-left text-xs font-semibold">
                            <button
                              type="button"
                              onClick={() => { setActiveRowMenuId(null); openDetail(t); }}
                              className="w-full text-left px-4 py-2 hover:bg-surface-2 flex items-center gap-2 text-text border-none bg-transparent cursor-pointer"
                            >
                              <PenSquare size={13} className="text-text-2" /> Detail & Edit
                            </button>
                            <div className="border-t border-border/80 my-1" />
                            <p className="px-4 py-1 text-[9px] font-extrabold text-text-3 uppercase tracking-wider">Ubah Status</p>
                            {['Open', 'In Progress', 'Pending Vendor', 'Resolved', 'Closed'].map(st => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => handleUpdateStatusDirect(t.id, st)}
                                className="w-full text-left px-4 py-1.5 hover:bg-surface-2 flex items-center justify-between text-text-2 hover:text-text border-none bg-transparent cursor-pointer"
                              >
                                <span>{st}</span>
                                {t.status === st && <Check size={11} className="text-blue" />}
                              </button>
                            ))}
                            <div className="border-t border-border/80 my-1" />
                            <button
                              type="button"
                              onClick={() => handleDeleteDirect(t.id)}
                              className="w-full text-left px-4 py-2 hover:bg-rose-light/50 hover:text-rose text-xs font-bold text-rose border-none bg-transparent cursor-pointer flex items-center gap-2"
                            >
                              <Trash2 size={13} /> Hapus Tiket
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 7. Pagination Panel (Standard clean footer) */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between py-4 bg-white dark:bg-slate-900 border border-border/70 dark:border-border/10 rounded-2xl px-6 shadow-sm">
          <p className="text-[10px] text-text-3 font-extrabold uppercase tracking-wider">
            Menampilkan <b className="text-text">{Math.min(filteredTickets.length, offset + 1)}–{Math.min(filteredTickets.length, offset + limit)}</b> dari <b className="text-text">{totalCount}</b> tiket
          </p>
          <div className="flex gap-2">
            <button
              disabled={offset === 0}
              onClick={() => setOffset(prev => Math.max(0, prev - limit))}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-xxs font-extrabold text-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 cursor-pointer shadow-sm"
            >
              Sebelumnya
            </button>
            <button
              disabled={offset + limit >= totalCount}
              onClick={() => setOffset(prev => prev + limit)}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-xxs font-extrabold text-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 cursor-pointer shadow-sm"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}

      {/* Edit ticket Detail Modal (High-fidelity drawer) */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) closeDetail(); }}>
          <div className="modal-container modal-md max-w-lg">
            <div className="modal-header">
              <div>
                <span className="modal-title">Detail Tiket IT Helpdesk</span>
                <div className="text-[10px] font-mono text-text-3 mt-0.5">{selectedTicket.id}</div>
              </div>
              <button onClick={closeDetail} className="btn-icon cursor-pointer" title="Tutup">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="modal-body space-y-4">
              <FormError msg={saveError} />

              <div className="bg-surface-2 dark:bg-slate-800/50 rounded-xl p-4 border border-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-2 font-semibold">Pelapor</span>
                  <span className="text-text font-bold">{selectedTicket.reporterName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-2 font-semibold">Ticket Source</span>
                  <span className="text-text font-medium">{selectedTicket.ticketSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-2 font-semibold">Waktu Lapor</span>
                  <span className="text-text font-medium">{selectedTicket.ticketDate} {selectedTicket.ticketTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-2 font-semibold">Lokasi</span>
                  <span className="text-text font-medium">{selectedTicket.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-2 font-semibold">Kategori</span>
                  <span className="text-text font-medium">{selectedTicket.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-2 font-semibold">Prioritas</span>
                  <span className="text-text"><Badge label={selectedTicket.priority} colorClass={priorityColors[selectedTicket.priority]} /></span>
                </div>
                
                <div className="pt-2 border-t border-border mt-2">
                  <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Judul Masalah</div>
                  <p className="font-bold text-text leading-relaxed">{selectedTicket.issueTitle}</p>
                </div>
                <div className="pt-2 border-t border-border mt-2">
                  <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Deskripsi Gangguan</div>
                  <p className="text-text-2 leading-relaxed whitespace-pre-wrap">{selectedTicket.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Status Tiket</label>
                  <select
                    title="Status"
                    className="input-premium font-bold cursor-pointer"
                    value={editStatus}
                    onChange={e => handleStatusChange(e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending Vendor">Pending Vendor</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Status SLA</label>
                  <select
                    title="SLA"
                    className="input-premium font-bold cursor-pointer"
                    value={editSla}
                    onChange={e => setEditSla(e.target.value)}
                  >
                    <option value="">-- Belum --</option>
                    <option value="Achieved">Achieved</option>
                    <option value="Breached">Breached</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Tgl Respon Awal</label>
                  <DatePickerPremium
                    value={editResponseDate}
                    onChange={val => setEditResponseDate(val)}
                  />
                </div>
                <div>
                  <label className="form-label">Jam Respon Awal</label>
                  <input
                    type="time"
                    title="Response Time"
                    className="input-premium text-xs"
                    value={editResponseTime}
                    onChange={e => setEditResponseTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Tgl Selesai</label>
                  <DatePickerPremium
                    value={editResolvedDate}
                    onChange={val => setEditResolvedDate(val)}
                  />
                </div>
                <div>
                  <label className="form-label">Jam Selesai</label>
                  <input
                    type="time"
                    title="Resolved Time"
                    className="input-premium text-xs"
                    value={editResolvedTime}
                    onChange={e => setEditResolvedTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Dampak Kestabilan & Ketersediaan</label>
                <select
                  title="Dampak"
                  className="input-premium font-bold cursor-pointer"
                  value={editImpact}
                  onChange={e => setEditImpact(e.target.value)}
                >
                  <option value="">-- Pilih Dampak --</option>
                  {impacts.map(i => (
                    <option key={i.id} value={i.value}>{i.value}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={closeDetail}
                  className="btn cursor-pointer"
                  disabled={saving}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={15} /> Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
