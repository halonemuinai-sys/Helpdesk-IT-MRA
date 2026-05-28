'use client';

import { useEffect, useState } from 'react';
import { 
  FileText, Download, FolderOpen
} from 'lucide-react';
import { Badge, TableShell } from '@/components/PageShared';

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

export default function ReportsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearsList, setYearsList] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let y = 2026; y <= Math.max(2026, currentYear); y++) {
      list.push(y);
    }
    setYearsList(list);
  }, []);

  const fetchReportData = () => {
    setLoading(true);
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
        console.error('Error fetching report data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReportData();
  }, [month, year]);

  const handleExportCSV = () => {
    if (tickets.length === 0) {
      alert("Tidak ada data untuk diexport pada periode ini.");
      return;
    }

    const monthName = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ][month];

    const headers = [
      'Ticket ID', 'Reporter', 'Location', 'Date', 'Time', 
      'Category', 'Issue Title', 'Description', 'Priority', 
      'Impact', 'Status', 'SLA Status', 'Response Date', 'Resolution Date'
    ];

    const rows = [headers];

    tickets.forEach(t => {
      rows.push([
        t.id,
        `"${t.reporterName.replace(/"/g, '""')}"`,
        `"${t.location.replace(/"/g, '""')}"`,
        t.ticketDate,
        t.ticketTime,
        t.category,
        `"${t.issueTitle.replace(/"/g, '""')}"`,
        `"${t.description.replace(/"/g, '""')}"`,
        t.priority,
        t.impactLevel || '',
        t.status,
        t.slaStatus || '',
        t.responseDate || '',
        t.resolvedDate || ''
      ]);
    });

    const csvContent = "\uFEFF" + rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Helpdesk_Report_${monthName}_${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const total = tickets.length;
  const resolved = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
  const slaAchieved = tickets.filter(t => t.slaStatus === 'Achieved').length;
  const slaBreached = tickets.filter(t => t.slaStatus === 'Breached').length;
  
  const slaTotal = slaAchieved + slaBreached;
  const slaRate = slaTotal > 0 ? Math.round((slaAchieved / slaTotal) * 100) : 0;

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

  return (
    <div className="container space-y-6">
      <div className="card bg-white dark:bg-slate-900 p-5 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-light dark:bg-blue/10 text-blue flex items-center justify-center shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Laporan Bulanan IT Helpdesk</h3>
            <p className="text-xxs text-text-2 mt-0.5">Saring dan ekspor arsip laporan gangguan IT.</p>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select 
            title="Bulan"
            className="input-premium py-2 px-3 font-semibold text-xs cursor-pointer bg-white dark:bg-slate-850"
            value={month}
            onChange={e => setMonth(parseInt(e.target.value))}
          >
            <option value={0}>Januari</option>
            <option value={1}>Februari</option>
            <option value={2}>Maret</option>
            <option value={3}>April</option>
            <option value={4}>Mei</option>
            <option value={5}>Juni</option>
            <option value={6}>Juli</option>
            <option value={7}>Agustus</option>
            <option value={8}>September</option>
            <option value={9}>Oktober</option>
            <option value={10}>November</option>
            <option value={11}>Desember</option>
          </select>

          <select 
            title="Tahun"
            className="input-premium py-2 px-3 font-semibold text-xs cursor-pointer bg-white dark:bg-slate-850"
            value={year}
            onChange={e => setYear(parseInt(e.target.value))}
          >
            {yearsList.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button 
            onClick={handleExportCSV}
            className="btn btn-primary py-2 px-4 text-xs shrink-0 flex items-center gap-1.5"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Total Tiket</div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{total}</div>
        </div>
        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Selesai (Resolved)</div>
          <div className="text-2xl font-black text-emerald">{resolved}</div>
        </div>
        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Penyelesaian SLA</div>
          <div className="text-2xl font-black text-blue">{slaRate}%</div>
        </div>
        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">SLA Breached</div>
          <div className="text-2xl font-black text-rose">{slaBreached}</div>
        </div>
      </div>

      <TableShell
        headers={[
          { label: 'Ticket ID' },
          { label: 'Reporter / Lokasi' },
          { label: 'Tanggal' },
          { label: 'Kategori' },
          { label: 'Masalah' },
          { label: 'Status' },
          { label: 'SLA' }
        ]}
        loading={loading}
        colSpan={7}
      >
        {tickets.length === 0 && !loading ? (
          <tr>
            <td colSpan={7} className="text-center py-20 text-text-3">
              <FolderOpen className="mx-auto w-8 h-8 opacity-20 mb-3" />
              <p className="text-xs font-semibold">Tidak ada catatan tiket untuk periode ini.</p>
            </td>
          </tr>
        ) : (
          tickets.map(t => (
            <tr key={t.id} className="hover:bg-surface-2 transition-colors">
              <td className="font-mono font-black text-blue">{t.id}</td>
              <td>
                <div className="font-bold text-text">{t.reporterName}</div>
                <div className="text-[10px] text-text-3">{t.location}</div>
              </td>
              <td className="text-text font-medium">{t.ticketDate}</td>
              <td className="text-text-2 font-medium">{t.category}</td>
              <td>
                <div className="font-bold text-text truncate max-w-xs">{t.issueTitle}</div>
                <div className="text-[10px] text-text-3 truncate max-w-xs">{t.description}</div>
              </td>
              <td>
                <Badge label={t.status} colorClass={statusColors[t.status]} />
              </td>
              <td>
                <Badge label={t.slaStatus || '—'} colorClass={slaColors[t.slaStatus] || 'badge-slate'} />
              </td>
            </tr>
          ))
        )}
      </TableShell>
    </div>
  );
}
