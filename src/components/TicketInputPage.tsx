'use client';

import { useEffect, useState } from 'react';
import { Headset, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { FF, FormError } from '@/components/PageShared';

interface Employee {
  id: number;
  name: string;
  department: string;
  location: string;
  company_name: string;
}

interface DropdownItem {
  id: number;
  category: string;
  value: string;
}

export default function TicketInputPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [sources, setSources] = useState<DropdownItem[]>([]);
  const [impacts, setImpacts] = useState<DropdownItem[]>([]);

  // Form states
  const [reporterName, setReporterName] = useState('');
  const [ticketSource, setTicketSource] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [ticketTime, setTicketTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [impactLevel, setImpactLevel] = useState('');

  // UI states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successId, setSuccessId] = useState('');

  // Auto-fill date/time
  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    setTicketDate(`${yyyy}-${mm}-${dd}`);

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    setTicketTime(`${hh}:${min}`);
  }, [successId]);

  // Load dropdown options & employees
  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(d => setEmployees(d.data || []))
      .catch(err => console.error('Error loading employees:', err));

    fetch('/api/master-data?category=HD_Kategori')
      .then(res => res.json())
      .then(d => setCategories(d.data || []))
      .catch(err => console.error('Error loading categories:', err));

    fetch('/api/master-data?category=HD_Source')
      .then(res => res.json())
      .then(d => setSources(d.data || []))
      .catch(err => console.error('Error loading sources:', err));

    fetch('/api/master-data?category=HD_Dampak')
      .then(res => res.json())
      .then(d => setImpacts(d.data || []))
      .catch(err => console.error('Error loading impacts:', err));
  }, []);

  const handleReporterChange = (name: string) => {
    setReporterName(name);
    const emp = employees.find(e => e.name === name);
    if (emp && emp.location) {
      setLocation(emp.location);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reporterName || !ticketSource || !location || !category || !issueTitle || !description) {
      setErrorMsg('Mohon lengkapi seluruh field wajib.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessId('');

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reporterName,
          ticketSource,
          ticketDate,
          ticketTime,
          location,
          category,
          issueTitle,
          description,
          priority,
          impactLevel
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim tiket.');
      }

      setSuccessId(data.data.id);
      
      setReporterName('');
      setTicketSource('');
      setLocation('');
      setCategory('');
      setIssueTitle('');
      setDescription('');
      setPriority('Medium');
      setImpactLevel('');

      setTimeout(() => {
        setSuccessId('');
      }, 7000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl">
      <div className="card overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xl">
        <div className="bg-gradient-to-r from-blue to-indigo px-8 py-6 flex items-center gap-4 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm shrink-0">
            <Headset size={20} />
          </div>
          <div>
            <h3 className="text-md font-black">Laporan Gangguan IT</h3>
            <p className="text-white/70 text-xxs mt-0.5">Silakan isi formulir di bawah untuk melaporkan kendala sistem.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <FormError msg={errorMsg} />

          <div className="grid grid-cols-2 gap-4">
            <FF label="Tanggal Lapor" required>
              <input
                type="date"
                title="Tanggal Lapor"
                className="input-premium"
                value={ticketDate}
                onChange={e => setTicketDate(e.target.value)}
                required
              />
            </FF>
            <FF label="Jam Lapor" required>
              <input
                type="time"
                title="Jam Lapor"
                className="input-premium"
                value={ticketTime}
                onChange={e => setTicketTime(e.target.value)}
                required
              />
            </FF>
          </div>

          <FF label="Nama Pelapor" required>
            <select
              title="Reporter"
              className="input-premium font-medium cursor-pointer"
              value={reporterName}
              onChange={e => handleReporterChange(e.target.value)}
              required
            >
              <option value="" disabled>-- Pilih Karyawan --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.name}>
                  {emp.name} — {emp.department} ({emp.company_name})
                </option>
              ))}
            </select>
          </FF>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FF label="Ticket Source" required>
              <select
                title="Ticket Source"
                className="input-premium font-medium cursor-pointer"
                value={ticketSource}
                onChange={e => setTicketSource(e.target.value)}
                required
              >
                <option value="" disabled>-- Pilih Source --</option>
                {sources.map(s => (
                  <option key={s.id} value={s.value}>{s.value}</option>
                ))}
              </select>
            </FF>

            <FF label="Lokasi Pelapor" required>
              <input
                type="text"
                placeholder="Auto-filled atau ketik lokasi..."
                className="input-premium"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
            </FF>
          </div>

          <FF label="Kategori Masalah" required>
            <select
              title="Kategori Masalah"
              className="input-premium font-medium cursor-pointer"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>-- Pilih Kategori --</option>
              {categories.map(c => (
                <option key={c.id} value={c.value}>{c.value}</option>
              ))}
            </select>
          </FF>

          <FF label="Judul Masalah" required>
            <input
              type="text"
              placeholder="E.g. Printer POS mati, Email terkunci, Jaringan lambat..."
              className="input-premium"
              value={issueTitle}
              onChange={e => setIssueTitle(e.target.value)}
              required
            />
          </FF>

          <FF label="Deskripsi Kendala" required>
            <textarea
              placeholder="Jelaskan detail masalah secara kronologis, cantumkan pesan error jika ada..."
              className="input-premium h-28 resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </FF>

          <div className="grid grid-cols-2 gap-4">
            <FF label="Prioritas" required>
              <select
                title="Prioritas"
                className="input-premium font-medium cursor-pointer"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                required
              >
                <option value="Low">Low (Tidak Mendesak)</option>
                <option value="Medium">Medium (Standar)</option>
                <option value="High">High (Mendesak)</option>
                <option value="Critical">Critical (Sangat Kritis)</option>
              </select>
            </FF>

            <FF label="Dampak Kestabilan & Ketersediaan">
              <select
                title="Dampak Sistem"
                className="input-premium font-medium cursor-pointer"
                value={impactLevel}
                onChange={e => setImpactLevel(e.target.value)}
              >
                <option value="">-- Pilih Dampak --</option>
                {impacts.map(i => (
                  <option key={i.id} value={i.value}>{i.value}</option>
                ))}
              </select>
            </FF>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue hover:bg-blue-d text-white font-bold text-sm rounded-xl shadow-lg shadow-blue/20 transition-all flex justify-center items-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Mengirim Tiket...
              </>
            ) : (
              <>
                <Send size={16} /> Submit Tiket
              </>
            )}
          </button>
        </form>
      </div>

      {successId && (
        <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-450">Tiket berhasil dibuat!</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-500">Ticket ID: <span className="font-mono font-bold">{successId}</span> telah dikirim ke tim IT.</div>
          </div>
        </div>
      )}
    </div>
  );
}
