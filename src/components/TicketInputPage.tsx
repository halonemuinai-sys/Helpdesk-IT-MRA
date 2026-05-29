'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Headset, Send, CheckCircle2, Loader2,
  ChevronRight, ChevronLeft, Check, AlertCircle,
  Clock, User, FileText, Zap,
} from 'lucide-react';
import { DatePickerPremium } from '@/components/PageShared';

// ── Types ──────────────────────────────────────────────────────────────
interface Employee     { id: number; name: string; email: string; company_name: string }
interface DropdownItem { id: number; category: string; value: string }

interface FormData {
  ticketDate:   string;
  ticketTime:   string;
  ticketSource: string;
  reporterName: string;
  companyName:  string;
  location:     string;
  category:     string;
  issueTitle:   string;
  description:  string;
  priority:     string;
  impactLevel:  string;
}

// ── Constants ──────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Sumber',    desc: 'Waktu & sumber laporan',  icon: Clock    },
  { id: 2, label: 'Pelapor',   desc: 'Identitas pelapor',       icon: User     },
  { id: 3, label: 'Masalah',   desc: 'Detail gangguan IT',      icon: FileText },
  { id: 4, label: 'Konfirmasi', desc: 'Prioritas & kirim tiket', icon: Zap     },
];

const PRIORITY_META: Record<string, { color: string; bg: string; border: string; label: string }> = {
  Low:      { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', label: 'LOW'      },
  Medium:   { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'MEDIUM'   },
  High:     { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: 'HIGH'     },
  Critical: { color: '#e11d48', bg: '#fff1f2', border: '#fecdd3', label: 'CRITICAL' },
};

const EMPTY_FORM: FormData = {
  ticketDate: '', ticketTime: '', ticketSource: '',
  reporterName: '', companyName: '', location: '',
  category: '', issueTitle: '', description: '',
  priority: 'Medium', impactLevel: '',
};

// ── Small shared helpers ───────────────────────────────────────────────
function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <label style={{
      display: 'block', fontSize: '0.62rem', fontWeight: 800,
      color: 'var(--text-3)', textTransform: 'uppercase',
      letterSpacing: '0.08em', marginBottom: '0.4rem',
    }}>
      {children}
      {required && <span style={{ color: 'var(--rose)', marginLeft: 2 }}>*</span>}
    </label>
  );
}

// ── Step Progress Bar ──────────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {STEPS.map((step, i) => {
        const done   = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '0.8rem',
                background: done ? 'var(--emerald)' : active ? 'var(--blue)' : 'var(--surface)',
                color: done || active ? '#fff' : 'var(--text-3)',
                border: active ? '2.5px solid var(--blue-d)' : done ? '2.5px solid var(--emerald)' : '2px solid var(--border)',
                boxShadow: active ? '0 4px 14px var(--blue-glow)' : done ? '0 4px 14px var(--emerald-glow)' : 'none',
                transition: 'all 0.3s',
              }}>
                {done ? <Check size={16} /> : step.id}
              </div>
              <span style={{
                fontSize: '0.63rem', fontWeight: active ? 800 : 600, whiteSpace: 'nowrap',
                color: active ? 'var(--blue)' : done ? 'var(--emerald)' : 'var(--text-3)',
              }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 56, height: 2, margin: '0 4px', marginBottom: 20,
                background: current > step.id ? 'var(--emerald)' : 'var(--border)',
                transition: 'background 0.3s',
                flexShrink: 0,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Live Ticket Preview Card ───────────────────────────────────────────
function PreviewCard({ form }: { form: FormData }) {
  const pMeta    = PRIORITY_META[form.priority] ?? PRIORITY_META.Medium;
  const initials = form.reporterName
    ? form.reporterName.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
    : '?';

  const displayDate = form.ticketDate
    ? new Date(form.ticketDate + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  const today = new Date();
  const ticketIdPreview = `HD-${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}-XXX`;

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      {/* Card header */}
      <div style={{ padding: '10px 16px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Preview Tiket
        </span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue)', fontFamily: 'monospace' }}>
          {ticketIdPreview}
        </span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Reporter row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
            background: form.reporterName ? 'linear-gradient(135deg, var(--blue), var(--indigo))' : 'var(--border)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '0.72rem', boxShadow: form.reporterName ? '0 4px 10px var(--blue-glow)' : 'none',
          }}>
            {form.reporterName ? initials : <User size={16} color="var(--text-3)" />}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.83rem', color: form.reporterName ? 'var(--text)' : 'var(--text-3)', fontStyle: form.reporterName ? 'normal' : 'italic' }}>
              {form.reporterName || 'Nama Pelapor'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 2 }}>
              {[form.companyName, form.location].filter(Boolean).join(' / ') || 'Lokasi belum diisi'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 12 }} />

        {/* Ticket title */}
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontWeight: 800, fontSize: '0.9rem',
            color: form.issueTitle ? 'var(--text)' : 'var(--text-3)',
            fontStyle: form.issueTitle ? 'normal' : 'italic',
            lineHeight: 1.35,
          }}>
            {form.issueTitle || 'Judul masalah belum diisi...'}
          </div>
          {form.category && (
            <div style={{ fontSize: '0.7rem', color: 'var(--text-2)', marginTop: 4, fontWeight: 500 }}>
              {form.category}
            </div>
          )}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{
            fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
            padding: '3px 10px', borderRadius: 20,
            background: pMeta.bg, color: pMeta.color, border: `1px solid ${pMeta.border}`,
          }}>
            {pMeta.label}
          </span>
          <span style={{
            fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
            padding: '3px 10px', borderRadius: 20,
            background: 'var(--blue-light)', color: 'var(--blue)', border: '1px solid var(--blue-border)',
          }}>
            OPEN
          </span>
          {form.ticketSource && (
            <span style={{
              fontSize: '0.58rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20,
              background: 'var(--surface-2)', color: 'var(--text-3)', border: '1px solid var(--border)',
            }}>
              {form.ticketSource}
            </span>
          )}
        </div>

        {/* Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.7rem', color: 'var(--text-3)' }}>
          <Clock size={11} />
          <span>{displayDate}</span>
          {form.ticketTime && <><span>·</span><span>{form.ticketTime}</span></>}
        </div>
      </div>
    </div>
  );
}

// ── Completeness checklist ─────────────────────────────────────────────
function ChecklistPanel({ form, selectedCompany }: { form: FormData; selectedCompany: string }) {
  const checks = [
    { label: 'Waktu & Sumber',    done: !!(form.ticketDate && form.ticketTime && form.ticketSource) },
    { label: 'Identitas Pelapor', done: !!(selectedCompany && form.reporterName && form.location)   },
    { label: 'Detail Masalah',    done: !!(form.category && form.issueTitle && form.description)    },
    { label: 'Prioritas',         done: !!form.priority                                             },
  ];
  const total = checks.filter(c => c.done).length;

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, marginTop: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Kelengkapan
        </span>
        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: total === 4 ? 'var(--emerald)' : 'var(--text-3)' }}>
          {total}/4
        </span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, marginBottom: 12, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 4,
          width: `${(total / 4) * 100}%`,
          background: total === 4 ? 'var(--emerald)' : 'var(--blue)',
          transition: 'width 0.4s ease',
        }} />
      </div>
      {checks.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
            background: item.done ? 'var(--emerald)' : 'var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}>
            {item.done && <Check size={10} color="#fff" />}
          </div>
          <span style={{ fontSize: '0.75rem', color: item.done ? 'var(--emerald)' : 'var(--text-3)', fontWeight: item.done ? 600 : 400 }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
export default function TicketInputPage() {
  const [step, setStep] = useState(1);
  const [employees,       setEmployees]       = useState<Employee[]>([]);
  const [categories,      setCategories]      = useState<DropdownItem[]>([]);
  const [sources,         setSources]         = useState<DropdownItem[]>([]);
  const [impacts,         setImpacts]         = useState<DropdownItem[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [form,            setForm]            = useState<FormData>(EMPTY_FORM);
  const [loading,         setLoading]         = useState(false);
  const [errorMsg,        setErrorMsg]        = useState('');
  const [successId,       setSuccessId]       = useState('');

  // Unique companies sorted A-Z
  const uniqueCompanies = useMemo(() => {
    const set = new Set(employees.map(e => e.company_name).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'id'));
  }, [employees]);

  // Employees filtered + sorted by selected company
  const filteredEmployees = useMemo(() => {
    if (!selectedCompany) return employees;
    return employees
      .filter(e => e.company_name === selectedCompany)
      .sort((a, b) => a.name.localeCompare(b.name, 'id'));
  }, [employees, selectedCompany]);

  // Auto-fill date/time on mount & reset
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    setForm(f => ({
      ...f,
      ticketDate: `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`,
      ticketTime: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    }));
  }, [successId]);

  // Load dropdowns
  useEffect(() => {
    fetch('/api/employees').then(r => r.json()).then(d => setEmployees(d.data || []));
    fetch('/api/master-data?category=HD_Kategori').then(r => r.json()).then(d => setCategories(d.data || []));
    fetch('/api/master-data?category=HD_Source').then(r => r.json()).then(d => setSources(d.data || []));
    fetch('/api/master-data?category=HD_Dampak').then(r => r.json()).then(d => setImpacts(d.data || []));
  }, []);

  const set = (key: keyof FormData) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    // Reset reporter ketika company berganti
    setForm(f => ({ ...f, reporterName: '', companyName: company }));
  };

  const handleReporterChange = (name: string) => {
    const emp = employees.find(e => e.name === name);
    setForm(f => ({ ...f, reporterName: name, companyName: emp?.company_name || selectedCompany }));
  };

  const validateStep = (): string | null => {
    if (step === 1) {
      if (!form.ticketDate)   return 'Tanggal lapor wajib diisi';
      if (!form.ticketTime)   return 'Jam lapor wajib diisi';
      if (!form.ticketSource) return 'Sumber laporan wajib dipilih';
    }
    if (step === 2) {
      if (!selectedCompany)   return 'Perusahaan wajib dipilih terlebih dahulu';
      if (!form.reporterName) return 'Nama pelapor wajib dipilih';
      if (!form.location)     return 'Lokasi pelapor wajib diisi';
    }
    if (step === 3) {
      if (!form.category)    return 'Kategori masalah wajib dipilih';
      if (!form.issueTitle)  return 'Judul masalah wajib diisi';
      if (!form.description) return 'Deskripsi kendala wajib diisi';
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setErrorMsg(err); return; }
    setErrorMsg('');
    setStep(s => Math.min(s + 1, 4));
  };

  const handleBack = () => { setErrorMsg(''); setStep(s => Math.max(s - 1, 1)); };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reporterName: form.reporterName,
          ticketSource: form.ticketSource,
          ticketDate:   form.ticketDate,
          ticketTime:   form.ticketTime,
          location:     form.location,
          category:     form.category,
          issueTitle:   form.issueTitle,
          description:  form.description,
          priority:     form.priority,
          impactLevel:  form.impactLevel,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim tiket');
      setSuccessId(data.data.id);
      setStep(1);
      setForm(EMPTY_FORM);
      setSelectedCompany('');
      setTimeout(() => setSuccessId(''), 8000);
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const pMeta = PRIORITY_META[form.priority] ?? PRIORITY_META.Medium;

  return (
    <div className="container" style={{ maxWidth: 1080 }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--blue), var(--indigo))',
          boxShadow: '0 8px 20px var(--blue-glow)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Headset size={20} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Laporan Gangguan IT
          </h1>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-2)', marginTop: 2 }}>
            Isi formulir berikut untuk melaporkan kendala kepada tim IT MRA Group.
          </p>
        </div>
      </div>

      {/* ── Success Banner ── */}
      {successId && (
        <div style={{
          marginBottom: 20, borderRadius: 16, padding: '14px 18px',
          background: 'var(--emerald-light)', border: '1px solid var(--emerald-border)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'var(--emerald)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p style={{ fontSize: '0.83rem', fontWeight: 800, color: 'var(--emerald)' }}>Tiket berhasil dibuat!</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginTop: 2 }}>
              ID:&nbsp;
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--emerald)' }}>{successId}</span>
              &nbsp;— telah dikirim ke tim IT dan akan segera ditangani.
            </p>
          </div>
        </div>
      )}

      {/* ── Main 2-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 18, alignItems: 'start' }}>

        {/* ══ LEFT: Wizard card ══ */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(15,23,42,0.06)',
        }}>
          {/* Step bar header */}
          <div style={{ padding: '24px 32px 20px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            <StepBar current={step} />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <p style={{ fontSize: '0.63rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                LANGKAH {step} DARI 4
              </p>
              <p style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', marginTop: 3 }}>
                {STEPS[step - 1].desc}
              </p>
            </div>
          </div>

          {/* Step body */}
          <div style={{ padding: '28px 32px' }}>
            {/* Error message */}
            {errorMsg && (
              <div style={{
                marginBottom: 18, background: 'var(--rose-light)', border: '1px solid var(--rose-border)',
                borderRadius: 10, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rose)',
                fontSize: '0.8rem', fontWeight: 700,
              }}>
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                {errorMsg}
              </div>
            )}

            {/* ── Step 1: Waktu & Sumber ── */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <FieldLabel required>Tanggal Lapor</FieldLabel>
                    <DatePickerPremium value={form.ticketDate} onChange={set('ticketDate')} required />
                  </div>
                  <div>
                    <FieldLabel required>Jam Lapor</FieldLabel>
                    <input type="time" className="input-premium" value={form.ticketTime}
                      onChange={e => set('ticketTime')(e.target.value)} required />
                  </div>
                  <div>
                    <FieldLabel required>Sumber Laporan</FieldLabel>
                    <select className="input-premium cursor-pointer font-medium"
                      value={form.ticketSource} onChange={e => set('ticketSource')(e.target.value)} required>
                      <option value="" disabled>— Pilih —</option>
                      {sources.map(s => <option key={s.id} value={s.value}>{s.value}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Pelapor ── */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Company picker */}
                <div>
                  <FieldLabel required>Perusahaan</FieldLabel>
                  <select
                    className="input-premium cursor-pointer font-medium"
                    value={selectedCompany}
                    onChange={e => handleCompanyChange(e.target.value)}
                    required
                  >
                    <option value="" disabled>— Pilih Perusahaan —</option>
                    {uniqueCompanies.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {selectedCompany && (
                    <div style={{
                      marginTop: 8, display: 'flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', background: 'var(--blue-light)',
                      border: '1px solid var(--blue-border)', borderRadius: 8,
                      fontSize: '0.72rem', color: 'var(--blue-d)', fontWeight: 600,
                    }}>
                      <User size={11} />
                      {filteredEmployees.length} karyawan tersedia
                    </div>
                  )}
                </div>

                {/* Employee picker — hanya aktif setelah company dipilih */}
                <div>
                  <FieldLabel required>Nama Pelapor</FieldLabel>
                  <select
                    className="input-premium cursor-pointer font-medium"
                    value={form.reporterName}
                    onChange={e => handleReporterChange(e.target.value)}
                    disabled={!selectedCompany}
                    required
                    style={{ opacity: selectedCompany ? 1 : 0.5, cursor: selectedCompany ? 'pointer' : 'not-allowed' }}
                  >
                    <option value="" disabled>
                      {selectedCompany ? '— Pilih Nama Karyawan —' : '— Pilih perusahaan dulu —'}
                    </option>
                    {filteredEmployees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                {/* Lokasi */}
                <div>
                  <FieldLabel required>Lokasi Pelapor</FieldLabel>
                  <input
                    type="text"
                    className="input-premium"
                    placeholder="Nama gedung / outlet / area..."
                    value={form.location}
                    onChange={e => set('location')(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* ── Step 3: Masalah ── */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <FieldLabel required>Kategori Masalah</FieldLabel>
                  <select className="input-premium cursor-pointer font-medium"
                    value={form.category} onChange={e => set('category')(e.target.value)} required>
                    <option value="" disabled>— Pilih Kategori —</option>
                    {categories.map(c => <option key={c.id} value={c.value}>{c.value}</option>)}
                  </select>
                </div>
                <div>
                  <FieldLabel required>Judul Masalah</FieldLabel>
                  <input type="text" className="input-premium"
                    placeholder="Contoh: Printer POS mati, Email terkunci, Jaringan lambat..."
                    value={form.issueTitle} onChange={e => set('issueTitle')(e.target.value)} required />
                </div>
                <div>
                  <FieldLabel required>Deskripsi Kendala</FieldLabel>
                  <textarea className="input-premium resize-none"
                    style={{ minHeight: 120, lineHeight: 1.65 }}
                    placeholder="Jelaskan kronologi masalah secara detail. Sertakan pesan error jika ada, kapan mulai terjadi, dan langkah yang sudah dicoba..."
                    value={form.description} onChange={e => set('description')(e.target.value)} required />
                </div>
              </div>
            )}

            {/* ── Step 4: Prioritas & Konfirmasi ── */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <FieldLabel required>Prioritas</FieldLabel>
                    <select className="input-premium cursor-pointer font-semibold"
                      value={form.priority} onChange={e => set('priority')(e.target.value)} required>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                    <div style={{
                      marginTop: 8, display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 12px', background: pMeta.bg,
                      border: `1px solid ${pMeta.border}`, borderRadius: 10,
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: pMeta.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: pMeta.color }}>{pMeta.label}</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Dampak Sistem</FieldLabel>
                    <select className="input-premium cursor-pointer font-medium"
                      value={form.impactLevel} onChange={e => set('impactLevel')(e.target.value)}>
                      <option value="">— Pilih Dampak —</option>
                      {impacts.map(i => <option key={i.id} value={i.value}>{i.value}</option>)}
                    </select>
                  </div>
                </div>

                {/* Summary table */}
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
                  <p style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    Ringkasan Tiket
                  </p>
                  {[
                    ['Tanggal & Jam', `${form.ticketDate} · ${form.ticketTime}`],
                    ['Sumber',        form.ticketSource],
                    ['Pelapor',       form.reporterName],
                    ['Perusahaan',    form.companyName],
                    ['Lokasi',        form.location],
                    ['Kategori',      form.category],
                    ['Judul',         form.issueTitle],
                  ].map(([label, value]) => (
                    <div key={label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      padding: '7px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.78rem',
                    }}>
                      <span style={{ color: 'var(--text-3)', flexShrink: 0, marginRight: 12 }}>{label}</span>
                      <span style={{ color: 'var(--text)', fontWeight: 600, textAlign: 'right' }}>{value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation footer */}
          <div style={{
            padding: '16px 32px', borderTop: '1px solid var(--border)',
            background: 'var(--surface-2)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', borderRadius: 12,
                fontWeight: 700, fontSize: '0.83rem', cursor: step === 1 ? 'not-allowed' : 'pointer',
                border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)',
                opacity: step === 1 ? 0.4 : 1, transition: 'opacity 0.2s',
              }}
            >
              <ChevronLeft size={16} /> Kembali
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {STEPS.map(s => (
                <div key={s.id} style={{
                  width: step === s.id ? 20 : 7,
                  height: 7, borderRadius: 4,
                  background: step === s.id ? 'var(--blue)' : step > s.id ? 'var(--emerald)' : 'var(--border)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 24px', borderRadius: 12,
                  fontWeight: 800, fontSize: '0.83rem', cursor: 'pointer',
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--blue), var(--indigo))',
                  color: '#fff', boxShadow: '0 6px 18px var(--blue-glow)',
                }}
              >
                Lanjut <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 24px', borderRadius: 12,
                  fontWeight: 800, fontSize: '0.83rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  background: loading ? 'var(--border-2)' : 'linear-gradient(135deg, var(--emerald), #047857)',
                  color: '#fff',
                  boxShadow: loading ? 'none' : '0 6px 18px var(--emerald-glow)',
                }}
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Mengirim...</>
                  : <><Send size={16} /> Kirim Tiket</>
                }
              </button>
            )}
          </div>
        </div>

        {/* ══ RIGHT: Preview + Checklist ══ */}
        <div style={{ position: 'sticky', top: 20, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Live Preview
          </p>
          <PreviewCard form={form} />
          <ChecklistPanel form={form} selectedCompany={selectedCompany} />
        </div>
      </div>
    </div>
  );
}
