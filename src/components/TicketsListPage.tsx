'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  RotateCw, Search, PenSquare, X, Save, Loader2, Calendar,
  MoreVertical, Star, CheckCircle2, AlertTriangle, List, 
  Clock, Users, Trash2, Check, Plus, FolderOpen, AlertCircle
} from 'lucide-react';
import { Badge, FormError, TableShell, DatePickerPremium } from '@/components/PageShared';
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

export default function TicketsListPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('all'); // 'all' | 'starred' | 'active' | 'completed' | 'breached'
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);

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
      return (
        t.id.toLowerCase().includes(q) ||
        t.reporterName.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.issueTitle.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }

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
    { id: 'starred', label: 'Berbintang', icon: Star, count: allTickets.filter(t => starredTickets.has(t.id)).length, colorClass: 'text-amber font-black fill-amber' },
    { id: 'active', label: 'Tiket Aktif', icon: Clock, count: allTickets.filter(t => ['Open', 'In Progress', 'Pending Vendor'].includes(t.status)).length },
    { id: 'completed', label: 'Terselesaikan', icon: CheckCircle2, count: allTickets.filter(t => ['Resolved', 'Closed'].includes(t.status)).length },
    { id: 'breached', label: 'SLA Breached', icon: AlertTriangle, count: allTickets.filter(t => t.slaStatus === 'Breached').length, colorClass: 'text-rose font-black' },
  ];

  return (
    <div className="container space-y-4">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-border/70 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            IT Helpdesk Ticket Registry
          </h1>
          <p className="text-xs text-text-3">Kelola dan pantau status antrean gangguan IT MRA Group</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/input" className="no-underline">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue hover:bg-blue-d text-white text-xs font-bold rounded-full shadow-md transition-all cursor-pointer">
              <Plus size={15} /> Lapor Gangguan Baru
            </button>
          </Link>
        </div>
      </div>

      {/* Main Apps Script Double Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
        
        {/* Left Side: Filter Navigation */}
        <div className="space-y-4 shrink-0">
          <div className="card p-3 bg-white dark:bg-slate-900 space-y-1">
            <p className="text-[10px] font-extrabold px-3 py-2 text-text-3 uppercase tracking-wider">Kategori Filter</p>
            {navItems.map(item => {
              const active = activeNav === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setOffset(0); setSelectedIds(new Set()); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active 
                      ? 'bg-blue-light text-blue border-none dark:bg-blue/15 dark:text-blue-d' 
                      : 'hover:bg-surface-2 text-text-2 hover:text-text border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={active ? 'text-blue' : item.colorClass || 'text-text-3'} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    active ? 'bg-blue text-white' : 'bg-surface-2 text-text-3 border border-border/80'
                  }`}>
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Metrics Info Box */}
          <div className="card p-4 bg-white dark:bg-slate-900 space-y-3 text-xs border border-dashed border-border/80">
            <h4 className="font-bold text-text uppercase tracking-wider text-[10px] text-text-3 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald" /> Indikator SLA
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-text-2">Rasio Penyelesaian</span>
                <span className="text-blue">{counts.all > 0 ? Math.round(((counts.Resolved + counts.Closed) / counts.all) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div 
                  className="bg-blue h-1.5 rounded-full transition-all" 
                  style={{ width: `${counts.all > 0 ? ((counts.Resolved + counts.Closed) / counts.all) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="text-[10px] text-text-3 leading-relaxed">
              Google Apps Script layout ini mempermudah pencarian tiket secara visual melalui kategori navigasi cepat dan pembintangan manual.
            </div>
          </div>
        </div>

        {/* Right Side: Main Table & Search Operations */}
        <div className="space-y-4 min-w-0">
          
          {/* Table Header Filter & Search Box */}
          <div className="card p-3 bg-white dark:bg-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex items-center w-full max-w-md">
                <Search className="absolute left-3.5 w-4 h-4 text-text-3" />
                <input
                  type="text"
                  placeholder="Cari ID, pelapor, lokasi, kategori, atau masalah..."
                  className="input-premium pl-10 pr-4 py-2.5 w-full text-xs bg-slate-50 dark:bg-slate-800/40 border-none focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-blue/50 rounded-full transition-all"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setOffset(0); }}
                />
              </div>

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
          </div>

          {/* Apps Script Style Bulk Actions Bar */}
          {selectedIds.size > 0 && (
            <div className="flex items-center justify-between px-5 py-3 bg-blue-light/40 border border-blue-border/30 rounded-xl animate-slide-up text-xs font-bold text-blue dark:bg-blue/5">
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
                  className="px-3 py-1.5 bg-blue text-white rounded-full hover:bg-blue-d text-xxs font-bold cursor-pointer border-none"
                >
                  Set In Progress
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('Resolved')}
                  className="px-3 py-1.5 bg-emerald text-white rounded-full hover:bg-emerald/90 text-xxs font-bold cursor-pointer border-none"
                >
                  Set Resolved
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-rose text-white rounded-full hover:bg-rose/90 text-xxs font-bold cursor-pointer border-none flex items-center gap-1"
                >
                  <Trash2 size={11} /> Hapus Masal
                </button>
              </div>
            </div>
          )}

          {/* Main List Table */}
          <TableShell
            minWidth="1050px"
            headers={[
              { 
                label: (
                  <input 
                    type="checkbox" 
                    checked={selectedIds.size === paginatedTickets.length && paginatedTickets.length > 0} 
                    onChange={handleSelectAll} 
                    className="w-4 h-4 cursor-pointer accent-blue" 
                    title="Pilih semua"
                  />
                ), 
                width: 38 
              },
              { label: <Star size={13} className="text-text-3 fill-none" />, width: 32 },
              { label: 'Tiket & Judul Masalah' },
              { label: 'Pelapor & Lokasi' },
              { label: 'Kategori' },
              { label: 'Prioritas' },
              { label: 'Status' },
              { label: 'SLA' },
              { label: 'Waktu Lapor' },
              { label: 'Aksi', right: true }
            ]}
            loading={loading}
            colSpan={10}
          >
            {filteredTickets.length === 0 && !loading ? (
              <tr>
                <td colSpan={10} className="text-center py-20 text-text-3">
                  <FolderOpen className="mx-auto w-10 h-10 opacity-20 mb-3" />
                  <p className="text-xs font-semibold">Tidak ditemukan tiket yang sesuai kriteria filter.</p>
                </td>
              </tr>
            ) : (
              paginatedTickets.map(t => {
                const isSelectedRow = selectedIds.has(t.id);
                const isStarredRow = starredTickets.has(t.id);
                return (
                  <tr
                    key={t.id}
                    onClick={() => openDetail(t)}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer ${
                      isSelectedRow ? 'bg-blue-light/10 dark:bg-blue/5' : ''
                    } ${t.status === 'Resolved' || t.status === 'Closed' ? 'opacity-65' : ''}`}
                  >
                    <td onClick={e => e.stopPropagation()} className="w-10 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isSelectedRow}
                        onChange={(e) => toggleSelectRow(t.id, e as any)}
                        className="w-4 h-4 cursor-pointer accent-blue"
                        title="Pilih tiket"
                      />
                    </td>
                    <td onClick={e => toggleStar(t.id, e)} className="w-8 whitespace-nowrap">
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
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="font-bold text-text-2 text-[10px] font-mono leading-none mb-1">{t.id}</div>
                      <div className="font-bold text-xs text-text max-w-xs truncate" title={t.issueTitle}>
                        {t.issueTitle}
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="font-bold text-text-2 text-xs">{t.reporterName}</div>
                      <div className="text-[10px] text-text-3 max-w-[160px] truncate" title={t.location}>{t.location}</div>
                    </td>
                    <td className="text-xs font-medium text-text-2 whitespace-nowrap">{t.category}</td>
                    <td className="whitespace-nowrap">
                      <Badge label={t.priority} colorClass={priorityColors[t.priority]} />
                    </td>
                    <td className="whitespace-nowrap">
                      <Badge label={t.status} colorClass={statusColors[t.status]} />
                    </td>
                    <td className="whitespace-nowrap">
                      <Badge label={t.slaStatus || '—'} colorClass={slaColors[t.slaStatus] || 'badge-slate'} />
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="font-bold text-text text-xxs">{t.ticketDate}</div>
                      <div className="text-[9px] text-text-3 font-semibold mt-0.5">{t.ticketTime}</div>
                    </td>
                    <td onClick={e => e.stopPropagation()} className="relative text-right whitespace-nowrap">
                      <div className="flex justify-end items-center">
                        <button
                          onClick={() => setActiveRowMenuId(activeRowMenuId === t.id ? null : t.id)}
                          className="btn-icon bg-surface-2 border-none hover:bg-slate-200/80 dark:hover:bg-slate-800 text-text-2 p-1.5 rounded-full flex items-center justify-center cursor-pointer"
                          title="Menu aksi"
                        >
                          <MoreVertical size={14} />
                        </button>
                        
                        {/* Google Apps Script Style Row Action Dropdown */}
                        {activeRowMenuId === t.id && (
                          <>
                            <div className="fixed inset-0 z-40 cursor-default" onClick={() => setActiveRowMenuId(null)} />
                            <div className="absolute right-0 mt-8 w-44 rounded-xl border border-border bg-surface shadow-hero z-50 py-1.5 text-left text-xs font-semibold">
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
                                className="w-full text-left px-4 py-2 hover:bg-rose-light/50 hover:text-rose flex items-center gap-2 text-rose border-none bg-transparent cursor-pointer font-bold"
                              >
                                <Trash2 size={13} /> Hapus Tiket
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </TableShell>

          {/* Pagination panel */}
          {totalCount > 0 && (
            <div className="flex items-center justify-between py-4 bg-white dark:bg-slate-900 border border-border rounded-2xl px-6">
              <p className="text-[10px] text-text-3 font-semibold">
                Menampilkan <b className="text-text">{Math.min(filteredTickets.length, offset + 1)}–{Math.min(filteredTickets.length, offset + limit)}</b> dari <b className="text-text">{totalCount}</b> tiket
              </p>
              <div className="flex gap-2">
                <button
                  disabled={offset === 0}
                  onClick={() => setOffset(prev => Math.max(0, prev - limit))}
                  className="px-3 py-1.5 border border-border rounded-lg bg-surface text-xxs font-bold text-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 cursor-pointer"
                >
                  Sebelumnya
                </button>
                <button
                  disabled={offset + limit >= totalCount}
                  onClick={() => setOffset(prev => prev + limit)}
                  className="px-3 py-1.5 border border-border rounded-lg bg-surface text-xxs font-bold text-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 cursor-pointer"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit ticket Detail Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) closeDetail(); }}>
          <div className="modal-container modal-md max-w-lg">
            <div className="modal-header">
              <div>
                <span className="modal-title">Detail Tiket IT Helpdesk</span>
                <div className="text-[10px] font-mono text-text-3 mt-0.5">{selectedTicket.id}</div>
              </div>
              <button onClick={closeDetail} className="btn-icon" title="Tutup">
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
