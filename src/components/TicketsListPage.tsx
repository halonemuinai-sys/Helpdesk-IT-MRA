'use client';

import { useEffect, useState } from 'react';
import { 
  RotateCw, Search, PenSquare, X, Save, Loader2
} from 'lucide-react';
import { Badge, FormError, TableShell } from '@/components/PageShared';

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);

  const [counts, setCounts] = useState<Record<string, number>>({
    all: 0, Open: 0, InProgress: 0, PendingVendor: 0, Resolved: 0, Closed: 0
  });

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

  const fetchTickets = () => {
    setLoading(true);
    const params = new URLSearchParams({
      status: statusFilter,
      query: searchQuery,
      limit: String(limit),
      offset: String(offset)
    });

    fetch(`/api/tickets?${params}`)
      .then(res => res.json())
      .then(d => {
        setTickets(d.data || []);
        setTotalCount(d.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tickets:', err);
        setLoading(false);
      });
  };

  const fetchCounts = () => {
    fetch('/api/tickets?limit=10000')
      .then(res => res.json())
      .then(d => {
        const list: Ticket[] = d.data || [];
        const c = {
          all: list.length,
          Open: list.filter(t => t.status === 'Open').length,
          InProgress: list.filter(t => t.status === 'In Progress').length,
          PendingVendor: list.filter(t => t.status === 'Pending Vendor').length,
          Resolved: list.filter(t => t.status === 'Resolved').length,
          Closed: list.filter(t => t.status === 'Closed').length,
        };
        setCounts(c);
      })
      .catch(err => console.error('Error loading counts:', err));
  };

  useEffect(() => {
    fetchTickets();
    fetchCounts();
    
    fetch('/api/master-data?category=HD_Dampak')
      .then(res => res.json())
      .then(d => setImpacts(d.data || []))
      .catch(err => console.error('Error loading impacts:', err));
  }, [statusFilter, offset, limit]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOffset(0);
    fetchTickets();
  };

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
      fetchTickets();
      fetchCounts();
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div className="container space-y-4">
      <div className="card bg-white dark:bg-slate-900 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Semua', countKey: 'all' },
              { id: 'Open', label: 'Open', countKey: 'Open', color: 'bg-rose-500' },
              { id: 'In Progress', label: 'In Progress', countKey: 'InProgress', color: 'bg-blue-500' },
              { id: 'Pending Vendor', label: 'Pending Vendor', countKey: 'PendingVendor', color: 'bg-amber-500' },
              { id: 'Resolved', label: 'Resolved', countKey: 'Resolved', color: 'bg-emerald-500' },
              { id: 'Closed', label: 'Closed', countKey: 'Closed', color: 'bg-slate-500' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setStatusFilter(tab.id); setOffset(0); }}
                className={`px-3 py-1.5 rounded-lg text-xxs font-bold transition-all flex items-center gap-1 border ${
                  statusFilter === tab.id
                    ? 'bg-blue-light text-blue border-blue dark:bg-blue/10 dark:text-blue'
                    : 'bg-transparent text-text-2 border-transparent hover:bg-surface-2 hover:text-text'
                }`}
              >
                {tab.color && <span className={`w-1.5 h-1.5 rounded-full ${tab.color}`} />}
                {tab.label}
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${statusFilter === tab.id ? 'bg-blue text-white dark:bg-blue/20' : 'bg-slate-100 dark:bg-slate-800 text-text-2'}`}>
                  {counts[tab.countKey] || 0}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-text-3" />
              <input
                type="text"
                placeholder="Cari ID, Pelapor, Judul..."
                className="input-premium pl-9 py-2 text-xs"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => { fetchTickets(); fetchCounts(); }}
              title="Refresh"
              className="btn px-2.5"
            >
              <RotateCw size={15} />
            </button>
          </form>
        </div>
      </div>

      <TableShell
        headers={[
          { label: 'Ticket ID' },
          { label: 'Pelapor / Lokasi' },
          { label: 'Tanggal' },
          { label: 'Kategori' },
          { label: 'Judul Masalah' },
          { label: 'Prioritas' },
          { label: 'Status' },
          { label: 'SLA' },
          { label: 'Dampak' },
          { label: 'Aksi', right: true }
        ]}
        loading={loading}
        colSpan={10}
      >
        {tickets.length === 0 && !loading ? (
          <tr>
            <td colSpan={10} className="text-center py-16 text-text-3">
              Belum ada tiket helpdesk tercatat.
            </td>
          </tr>
        ) : (
          tickets.map(t => (
            <tr
              key={t.id}
              onClick={() => openDetail(t)}
              className={`hover:bg-surface-2 transition-colors cursor-pointer ${
                t.status === 'Resolved' || t.status === 'Closed' ? 'opacity-60' : ''
              }`}
            >
              <td className="font-mono font-black text-blue">{t.id}</td>
              <td>
                <div className="font-bold text-text">{t.reporterName}</div>
                <div className="text-[10px] text-text-3">{t.location}</div>
              </td>
              <td>
                <div className="font-medium text-text">{t.ticketDate}</div>
                <div className="text-[10px] text-text-3">{t.ticketTime}</div>
              </td>
              <td className="font-medium text-text-2">{t.category}</td>
              <td className="max-w-xs font-semibold text-text truncate" title={t.issueTitle}>
                {t.issueTitle}
              </td>
              <td>
                <Badge label={t.priority} colorClass={priorityColors[t.priority]} />
              </td>
              <td>
                <Badge label={t.status} colorClass={statusColors[t.status]} />
              </td>
              <td>
                <Badge label={t.slaStatus || '—'} colorClass={slaColors[t.slaStatus] || 'badge-slate'} />
              </td>
              <td>
                <Badge label={t.impactLevel || '—'} colorClass={impactColors[t.impactLevel] || 'badge-slate'} />
              </td>
              <td>
                <div className="flex justify-end">
                  <button
                    onClick={(e) => { e.stopPropagation(); openDetail(t); }}
                    className="btn-icon bg-blue-light border-blue-border text-blue hover:bg-blue hover:text-white"
                  >
                    <PenSquare size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </TableShell>

      {totalCount > limit && (
        <div className="flex items-center justify-between py-4 bg-slate-50/50 dark:bg-slate-900/20 border border-dashed border-border rounded-xl px-6">
          <p className="text-[10px] text-text-3">
            Menampilkan <b className="text-text">{tickets.length}</b> dari <b className="text-text">{totalCount}</b> tiket
          </p>
          <button
            onClick={() => { setLimit(prev => prev + 50); }}
            className="btn py-2 text-xxs font-bold hover:bg-blue hover:text-white hover:border-blue"
          >
            Muat Lebih Banyak Tiket
          </button>
        </div>
      )}

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
                  <input
                    type="date"
                    title="Response Date"
                    className="input-premium text-xs"
                    value={editResponseDate}
                    onChange={e => setEditResponseDate(e.target.value)}
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
                  <input
                    type="date"
                    title="Resolved Date"
                    className="input-premium text-xs"
                    value={editResolvedDate}
                    onChange={e => setEditResolvedDate(e.target.value)}
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
                  className="btn"
                  disabled={saving}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
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
