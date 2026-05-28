'use client';

import { useEffect, useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar, List, 
  RotateCw, AlertCircle, X, Save, Loader2, PenSquare
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

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function TicketsCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering states
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal states
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  // Edit form states
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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchTickets = () => {
    setLoading(true);
    // Fetch this month's tickets (already supports limit=10000, month and year)
    const params = new URLSearchParams({
      month: String(month),
      year: String(year),
      limit: '10000'
    });

    fetch(`/api/tickets?${params}`)
      .then(res => res.json())
      .then(d => {
        setTickets(d.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tickets for calendar:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
    
    // Fetch impacts list for edit form dropdown
    fetch('/api/master-data?category=HD_Dampak')
      .then(res => res.json())
      .then(d => setImpacts(d.data || []))
      .catch(err => console.error('Error loading impacts:', err));
  }, [month, year]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const openTicketDetail = (ticket: Ticket) => {
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

  const closeTicketDetail = () => {
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

      closeTicketDetail();
      fetchTickets();
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filter logic
  const filteredTickets = tickets.filter(t => {
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  // Calendar Grid Calculation
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday, 1 is Monday, etc.
  const numDaysCurrentMonth = new Date(year, month + 1, 0).getDate();
  const numDaysPrevMonth = new Date(year, month, 0).getDate();

  const calendarCells = [];

  // 1. Prefix cells (previous month)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = numDaysPrevMonth - i;
    const cellDate = new Date(year, month - 1, d);
    const dateStr = cellDate.toISOString().split('T')[0];
    calendarCells.push({
      date: cellDate,
      dateNum: d,
      isCurrentMonth: false,
      dateStr
    });
  }

  // 2. Current month cells
  for (let d = 1; d <= numDaysCurrentMonth; d++) {
    const cellDate = new Date(year, month, d);
    const dateStr = cellDate.toISOString().split('T')[0];
    calendarCells.push({
      date: cellDate,
      dateNum: d,
      isCurrentMonth: true,
      dateStr
    });
  }

  // 3. Suffix cells (next month) to complete 6 rows (42 cells)
  const remainingCells = 42 - calendarCells.length;
  for (let d = 1; d <= remainingCells; d++) {
    const cellDate = new Date(year, month + 1, d);
    const dateStr = cellDate.toISOString().split('T')[0];
    calendarCells.push({
      date: cellDate,
      dateNum: d,
      isCurrentMonth: false,
      dateStr
    });
  }

  // Map tickets to dates
  const ticketsMap: Record<string, Ticket[]> = {};
  filteredTickets.forEach(t => {
    const dateStr = t.ticketDate;
    if (!ticketsMap[dateStr]) {
      ticketsMap[dateStr] = [];
    }
    ticketsMap[dateStr].push(t);
  });

  const priorityColors: Record<string, string> = {
    'Low': 'bg-slate-500/10 text-slate-700 dark:text-slate-300 dark:bg-slate-500/20 border-slate-500/20',
    'Medium': 'bg-amber-500/10 text-amber-700 dark:text-amber-300 dark:bg-amber-500/20 border-amber-500/20',
    'High': 'bg-rose-500/10 text-rose-700 dark:text-rose-300 dark:bg-rose-500/20 border-rose-500/20',
    'Critical': 'bg-rose-600/20 text-rose-800 dark:text-rose-300 dark:bg-rose-600/30 border-rose-600/40 font-bold'
  };

  const priorityBadgeColors: Record<string, string> = {
    'Low': 'badge-slate',
    'Medium': 'badge-amber',
    'High': 'badge-rose',
    'Critical': 'badge-rose animate-pulse'
  };

  const statusBadgeColors: Record<string, string> = {
    'Open': 'badge-rose',
    'In Progress': 'badge-blue',
    'Pending Vendor': 'badge-amber',
    'Resolved': 'badge-emerald',
    'Closed': 'badge-slate'
  };

  const slaBadgeColors: Record<string, string> = {
    'Achieved': 'badge-emerald',
    'Breached': 'badge-rose'
  };

  const impactBadgeColors: Record<string, string> = {
    'Sistem Down': 'badge-rose',
    'Sistem Lambat': 'badge-amber',
    'Beroperasi Normal': 'badge-emerald'
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="container space-y-4">
      {/* Calendar Header with Controls & Filters */}
      <div className="card bg-white dark:bg-slate-900 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-light dark:bg-blue/10 text-blue flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                Kalender Tiket IT Helpdesk
              </h1>
              <p className="text-[10px] text-text-2">Pemetaan visual laporan gangguan IT bulanan</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevMonth}
              className="btn py-1.5 px-2.5 rounded-lg border border-border bg-surface hover:bg-surface-2"
              title="Bulan Sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-black min-w-[120px] text-center text-slate-800 dark:text-slate-100">
              {MONTH_NAMES[month]} {year}
            </span>
            <button 
              onClick={handleNextMonth}
              className="btn py-1.5 px-2.5 rounded-lg border border-border bg-surface hover:bg-surface-2"
              title="Bulan Berikutnya"
            >
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={handleToday}
              className="btn py-1.5 px-3 rounded-lg text-xxs font-bold border border-border bg-surface hover:bg-surface-2"
            >
              Hari Ini
            </button>
          </div>

          {/* Actions & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select 
              title="Filter Prioritas"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="input-premium py-1.5 px-2.5 font-semibold text-[11px] w-32 cursor-pointer bg-white dark:bg-slate-850"
            >
              <option value="all">Semua Prioritas</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select 
              title="Filter Status"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="input-premium py-1.5 px-2.5 font-semibold text-[11px] w-32 cursor-pointer bg-white dark:bg-slate-850"
            >
              <option value="all">Semua Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Vendor">Pending Vendor</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <button 
              onClick={fetchTickets}
              className="btn py-1.5 px-2.5"
              title="Refresh Kalender"
            >
              <RotateCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            <Link href="/tickets" className="block no-underline">
              <span className="btn btn-primary py-1.5 px-3 text-xxs font-bold flex items-center gap-1.5">
                <List size={14} /> Daftar Tabel
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="card bg-white dark:bg-slate-900 p-3 shadow-md border border-border/80 overflow-hidden">
        {/* Day Name Headers */}
        <div className="grid grid-cols-7 gap-1.5 mb-1.5 border-b border-border/60 pb-2">
          {DAY_NAMES.map((day, idx) => (
            <div 
              key={day} 
              className={`text-center text-[10px] font-extrabold uppercase tracking-wider ${
                idx === 0 ? 'text-rose' : idx === 6 ? 'text-blue' : 'text-text-3'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Cells Grid */}
        <div className="grid grid-cols-7 gap-1.5 min-h-[500px]">
          {loading ? (
            <div className="col-span-7 flex flex-col items-center justify-center h-96 text-text-3 gap-2">
              <div className="w-8 h-8 border-2 border-border border-t-blue rounded-full animate-spin" />
              <span className="text-xxs font-bold">Memuat kalender tiket...</span>
            </div>
          ) : (
            calendarCells.map((cell, idx) => {
              const dayTickets = ticketsMap[cell.dateStr] || [];
              const isToday = cell.dateStr === todayStr;

              return (
                <div 
                  key={idx}
                  onClick={() => dayTickets.length > 0 && setSelectedDateStr(cell.dateStr)}
                  className={`group relative flex flex-col justify-between p-2 min-h-[90px] border border-border/40 rounded-xl transition-all duration-200 ${
                    cell.isCurrentMonth 
                      ? 'bg-surface dark:bg-slate-900' 
                      : 'bg-surface-2 dark:bg-slate-950/40 opacity-55'
                  } ${dayTickets.length > 0 ? 'cursor-pointer hover:border-blue/60 hover:shadow-premium' : ''} ${
                    isToday ? 'ring-2 ring-blue/50 dark:ring-blue/30 border-blue-border' : ''
                  }`}
                >
                  {/* Date Number Badge */}
                  <div className="flex justify-between items-center mb-1">
                    <span 
                      className={`text-xs font-black rounded-md w-6 h-6 flex items-center justify-center ${
                        isToday 
                          ? 'bg-blue text-white shadow-md shadow-blue/20' 
                          : cell.isCurrentMonth
                          ? 'text-slate-800 dark:text-slate-350'
                          : 'text-text-3'
                      }`}
                    >
                      {cell.dateNum}
                    </span>
                    {dayTickets.length > 0 && (
                      <span className="text-[9px] font-extrabold bg-blue-light text-blue dark:bg-blue/15 px-1.5 py-0.2 rounded-full">
                        {dayTickets.length}
                      </span>
                    )}
                  </div>

                  {/* Day Tickets List (Max 2 shown directly) */}
                  <div className="flex-1 flex flex-col gap-1 overflow-hidden mt-1 select-none">
                    {dayTickets.slice(0, 2).map((t, tIdx) => (
                      <div 
                        key={t.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          openTicketDetail(t);
                        }}
                        className={`text-[9px] px-1.5 py-1 rounded border leading-tight truncate font-semibold transition-all hover:scale-[1.02] ${
                          priorityColors[t.priority] || 'bg-slate-100 border-slate-200'
                        }`}
                        title={`${t.id}: ${t.issueTitle}`}
                      >
                        <span className="font-mono opacity-80 mr-1">{t.id.split('-').pop()}</span>
                        {t.reporterName.split(' ')[0]}: {t.issueTitle}
                      </div>
                    ))}
                    {dayTickets.length > 2 && (
                      <div className="text-[9px] text-text-3 font-bold text-center py-0.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-border/30 border-dashed">
                        + {dayTickets.length - 2} tiket lainnya
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal 1: Date Details View (Daftar Tiket Harian) */}
      {selectedDateStr && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelectedDateStr(null); }}>
          <div className="modal-container modal-md max-w-xl">
            <div className="modal-header">
              <div>
                <span className="modal-title">Daftar Gangguan IT</span>
                <div className="text-[10px] text-text-3 font-bold mt-0.5">
                  Tanggal: {new Date(selectedDateStr).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <button onClick={() => setSelectedDateStr(null)} className="btn-icon" title="Tutup">
                <X size={15} />
              </button>
            </div>

            <div className="modal-body space-y-2">
              {(ticketsMap[selectedDateStr] || []).map(t => (
                <div 
                  key={t.id}
                  onClick={() => {
                    openTicketDetail(t);
                  }}
                  className="card p-4 bg-white dark:bg-slate-900 border border-border/80 hover:border-blue/50 hover:shadow-premium transition-all duration-200 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-blue">{t.id}</span>
                      <span className="text-[10px] text-text-3 font-medium">{t.ticketTime}</span>
                      <Badge label={t.priority} colorClass={priorityBadgeColors[t.priority]} />
                    </div>
                    <h4 className="font-bold text-text truncate leading-snug">{t.issueTitle}</h4>
                    <p className="text-[11px] text-text-2 truncate">{t.description}</p>
                    <div className="text-[10px] text-text-3">
                      Pelapor: <b className="text-text">{t.reporterName}</b> ({t.location})
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Badge label={t.status} colorClass={statusBadgeColors[t.status]} />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openTicketDetail(t);
                      }}
                      className="btn-icon bg-blue-light border-blue-border text-blue hover:bg-blue hover:text-white"
                      title="Edit Tiket"
                    >
                      <PenSquare size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Ticket Editor Form */}
      {selectedTicket && (
        <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={e => { if (e.target === e.currentTarget) closeTicketDetail(); }}>
          <div className="modal-container modal-md max-w-lg">
            <div className="modal-header">
              <div>
                <span className="modal-title">Detail Tiket IT Helpdesk</span>
                <div className="text-[10px] font-mono text-text-3 mt-0.5">{selectedTicket.id}</div>
              </div>
              <button onClick={closeTicketDetail} className="btn-icon" title="Tutup">
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
                  <span className="text-text">
                    <Badge label={selectedTicket.priority} colorClass={priorityBadgeColors[selectedTicket.priority]} />
                  </span>
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
                  <label className="form-label" htmlFor="edit-status-select">Status Tiket</label>
                  <select
                    id="edit-status-select"
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
                  <label className="form-label" htmlFor="edit-sla-select">Status SLA</label>
                  <select
                    id="edit-sla-select"
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
                  <label className="form-label" htmlFor="edit-resp-date">Tgl Respon Awal</label>
                  <DatePickerPremium
                    value={editResponseDate}
                    onChange={val => setEditResponseDate(val)}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="edit-resp-time">Jam Respon Awal</label>
                  <input
                    id="edit-resp-time"
                    type="time"
                    className="input-premium text-xs"
                    value={editResponseTime}
                    onChange={e => setEditResponseTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label" htmlFor="edit-res-date">Tgl Selesai</label>
                  <DatePickerPremium
                    value={editResolvedDate}
                    onChange={val => setEditResolvedDate(val)}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="edit-res-time">Jam Selesai</label>
                  <input
                    id="edit-res-time"
                    type="time"
                    className="input-premium text-xs"
                    value={editResolvedTime}
                    onChange={e => setEditResolvedTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="edit-impact-select">Dampak Kestabilan & Ketersediaan</label>
                <select
                  id="edit-impact-select"
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
                  onClick={closeTicketDetail}
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
