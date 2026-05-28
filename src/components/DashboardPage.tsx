'use client';

import { useEffect, useState } from 'react';
import { 
  Ticket, CheckCircle2, Target, TrendingUp,
  Clock, AlertCircle, MapPin, ClipboardCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { SkeletonCard } from '@/components/PageShared';

interface DashboardData {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  pendingVendor: number;
  resolvedTickets: number;
  perLocation: Record<string, number>;
  perCategory: Record<string, number>;
  slaAchieved: number;
  slaBreached: number;
  slaPending: number;
  downtimePerLocation: Record<string, { count: number; totalMinutes: number }>;
  resolutionRate: number;
  avgResponseMinutes: number;
  avgResolveMinutes: number;
}

const COLORS = ['#2563eb', '#4f46e5', '#059669', '#d97706', '#e11d48', '#8b5cf6', '#0891b2', '#db2777'];

function formatMinutes(mins: number) {
  if (mins === 0) return '0 min';
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h < 24) return `${h}j ${m}m`;
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return `${d}h ${rh}j`;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="container space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card h-80 animate-pulse bg-surface-2" />
          <div className="card h-80 animate-pulse bg-surface-2" />
          <div className="card h-80 animate-pulse bg-surface-2" />
        </div>
      </div>
    );
  }

  const activeTickets = data.openTickets + data.inProgressTickets + data.pendingVendor;

  const locationChartData = Object.entries(data.perLocation).map(([name, value]) => ({
    name: name.length > 15 ? name.substring(0, 12) + '...' : name,
    tickets: value
  }));

  const categoryChartData = Object.entries(data.perCategory).map(([name, value]) => ({
    name,
    value
  }));

  const slaChartData = [
    { name: 'Achieved', value: data.slaAchieved, color: '#059669' },
    { name: 'Breached', value: data.slaBreached, color: '#e11d48' },
    { name: 'Pending', value: data.slaPending, color: '#64748b' }
  ].filter(d => d.value > 0);

  const slaTotal = data.slaAchieved + data.slaBreached;
  const slaRate = slaTotal > 0 ? Math.round((data.slaAchieved / slaTotal) * 100) : 0;

  const total = data.totalTickets || 1;
  const statuses = [
    { name: 'Open', count: data.openTickets, color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
    { name: 'In Progress', count: data.inProgressTickets, color: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
    { name: 'Pending Vendor', count: data.pendingVendor, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { name: 'Resolved / Closed', count: data.resolvedTickets, color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' }
  ];

  return (
    <div className="container space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            IT Helpdesk Dashboard
          </h1>
          <p className="text-xs text-text-2">Ringkasan performa resolusi gangguan sistem IT MRA</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider">Total Tiket</span>
            <div className="w-8 h-8 rounded-lg bg-blue-light dark:bg-blue/10 text-blue flex items-center justify-center text-xs">
              <Ticket size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-850 dark:text-slate-100">{data.totalTickets}</div>
        </div>

        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider">Active Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-rose-light dark:bg-rose/10 text-rose flex items-center justify-center text-xs">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-rose">{activeTickets}</div>
        </div>

        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider">Resolved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-light dark:bg-emerald/10 text-emerald flex items-center justify-center text-xs">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald">{data.resolvedTickets}</div>
        </div>

        <div className="card p-5 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider">SLA Achievement</span>
            <div className="w-8 h-8 rounded-lg bg-blue-light dark:bg-blue/10 text-blue flex items-center justify-center text-xs">
              <Target size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-blue">{slaRate}%</div>
        </div>

        <div className="card p-5 bg-white dark:bg-slate-900 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider">Resolution Rate</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-light dark:bg-indigo/10 text-indigo flex items-center justify-center text-xs">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo">{data.resolutionRate}%</div>
        </div>
      </div>

      {isMounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card bg-white dark:bg-slate-900 min-w-0">
            <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
              <MapPin size={14} className="text-blue" /> Tiket per Lokasi
            </h4>
            <div className="h-60 w-full relative min-w-0">
              <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={locationChartData} layout="vertical" margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--text-3)" fontSize={10} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-3)" fontSize={10} width={80} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px' }}
                    labelStyle={{ color: 'var(--text)', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="tickets" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card bg-white dark:bg-slate-900 min-w-0">
            <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
              <ClipboardCheck size={14} className="text-blue" /> Tiket per Kategori
            </h4>
            <div className="h-60 w-full relative min-w-0 flex items-center justify-center">
              {categoryChartData.length === 0 ? (
                <div className="text-xs text-text-3">Belum ada data</div>
              ) : (
                <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="45%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="card bg-white dark:bg-slate-900 min-w-0">
            <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
              <Target size={14} className="text-blue" /> SLA Status Summary
            </h4>
            <div className="h-60 w-full relative min-w-0 flex items-center justify-center">
              {slaChartData.length === 0 ? (
                <div className="text-xs text-text-3">Belum ada data</div>
              ) : (
                <ResponsiveContainer width="99%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={slaChartData}
                      cx="50%"
                      cy="45%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {slaChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '10px' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
              <Clock size={14} className="text-blue" /> Performa Waktu Respon & Resolusi
            </h4>
            <p className="text-xxs text-text-2 mb-6">Rata-rata waktu tanggap tim support IT setelah tiket terdaftar.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-light dark:bg-blue/5 rounded-2xl p-5 border border-blue-border dark:border-blue-border/20 text-center">
              <div className="text-[10px] font-bold text-blue uppercase tracking-wider mb-1">Avg. Respon Awal</div>
              <div className="text-2xl font-black text-blue">{formatMinutes(data.avgResponseMinutes)}</div>
            </div>
            <div className="bg-emerald-light dark:bg-emerald/5 rounded-2xl p-5 border border-emerald-border dark:border-emerald-border/20 text-center">
              <div className="text-[10px] font-bold text-emerald uppercase tracking-wider mb-1">Avg. Penyelesaian</div>
              <div className="text-2xl font-black text-emerald">{formatMinutes(data.avgResolveMinutes)}</div>
            </div>
          </div>
        </div>

        <div className="card bg-white dark:bg-slate-900">
          <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
            <ClipboardCheck size={14} className="text-blue" /> Distribusi Status Tiket
          </h4>
          <div className="space-y-4 pt-2">
            {statuses.map(s => {
              const pct = Math.round((s.count / total) * 100);
              return (
                <div key={s.name}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className={s.text}>{s.name}</span>
                    <span className="text-text-2">
                      {s.count} <span className="text-text-3 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className={`${s.color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card bg-white dark:bg-slate-900">
        <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
          <ExclamationTriangleIcon size={14} className="text-rose" /> Laporan Downtime per Lokasi
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-border text-[10px] font-bold text-text-3 uppercase tracking-wider">
                <th className="px-4 py-3">Lokasi</th>
                <th className="px-4 py-3 text-center">Jumlah Insiden Down</th>
                <th className="px-4 py-3 text-right">Total Downtime</th>
                <th className="px-4 py-3 text-right">Avg. per Insiden</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {Object.keys(data.downtimePerLocation).length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-text-3">
                    <span className="text-emerald font-bold">✔ Tidak ada insiden Sistem Down tercatat.</span>
                  </td>
                </tr>
              ) : (
                Object.entries(data.downtimePerLocation).map(([loc, d]) => {
                  const avg = d.count > 0 ? Math.round(d.totalMinutes / d.count) : 0;
                  return (
                    <tr key={loc} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3 font-bold text-text">{loc}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-rose-light text-rose px-2.5 py-0.5 rounded-full text-xxs font-bold border border-rose-border/30">
                          {d.count}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-text">{formatMinutes(d.totalMinutes)}</td>
                      <td className="px-4 py-3 text-right text-text-2">{formatMinutes(avg)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-white dark:bg-slate-900">
        <h4 className="font-bold text-slate-700 dark:text-slate-350 text-xs mb-4 flex items-center gap-2">
          <ClipboardCheck size={14} className="text-blue" /> Summary Penyelesaian Tiket
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-border text-[10px] font-bold text-text-3 uppercase tracking-wider">
                <th className="px-4 py-3">Metrik</th>
                <th className="px-4 py-3 text-right">Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">Total Tiket Dibuat</td>
                <td className="px-4 py-3 text-right font-black text-text">{data.totalTickets}</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">Tiket Selesai (Resolved + Closed)</td>
                <td className="px-4 py-3 text-right font-black text-emerald">{data.resolvedTickets}</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">Persentase Penyelesaian</td>
                <td className="px-4 py-3 text-right font-black text-blue">{data.resolutionRate}%</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">SLA Achieved</td>
                <td className="px-4 py-3 text-right font-black text-emerald">{data.slaAchieved}</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">SLA Breached</td>
                <td className="px-4 py-3 text-right font-black text-rose">{data.slaBreached}</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">Rata-rata Waktu Respon Awal</td>
                <td className="px-4 py-3 text-right font-black text-text">{formatMinutes(data.avgResponseMinutes)}</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">Rata-rata Waktu Penyelesaian</td>
                <td className="px-4 py-3 text-right font-black text-text">{formatMinutes(data.avgResolveMinutes)}</td>
              </tr>
              <tr className="hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3 text-text-2">Tiket Aktif / Open</td>
                <td className="px-4 py-3 text-right font-black text-rose">{activeTickets}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExclamationTriangleIcon({ size = 16, className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
