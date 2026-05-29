'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Users, Search, Building2, ChevronLeft, ChevronRight,
  Loader2, Mail, Plus, Pencil, Trash2, X, Save, AlertCircle,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────
interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  email: string;
  company_name: string;
}

interface Company { id: number; name: string }

interface FormState {
  name: string;
  department: string;
  role: string;
  email: string;
  status: string;
  companyId: string;
}

const EMPTY_FORM: FormState = {
  name: '', department: '', role: '', email: '', status: 'Active', companyId: '',
};

const LIMIT = 50;

// ── Helpers ────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase();
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700', 'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700', 'bg-cyan-100 text-cyan-700',
  'bg-pink-100 text-pink-700', 'bg-indigo-100 text-indigo-700',
];
function avatarColor(name: string) {
  const code = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

// ── Field Label ────────────────────────────────────────────
function FL({ children, required }: { children: string; required?: boolean }) {
  return (
    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
      {children}{required && <span style={{ color: 'var(--rose)', marginLeft: 2 }}>*</span>}
    </label>
  );
}

// ── Employee Modal ─────────────────────────────────────────
function EmployeeModal({
  mode, form, companies, saving, errorMsg,
  onChange, onSave, onClose,
}: {
  mode: 'add' | 'edit';
  form: FormState;
  companies: Company[];
  saving: boolean;
  errorMsg: string;
  onChange: (key: keyof FormState, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 520, boxShadow: '0 24px 60px rgba(15,23,42,0.25)', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.2s ease-out' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: mode === 'add' ? 'var(--blue-light)' : 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {mode === 'add' ? <Plus size={16} style={{ color: 'var(--blue)' }} /> : <Pencil size={15} style={{ color: 'var(--amber)' }} />}
            </div>
            <div>
              <p style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text)' }}>
                {mode === 'add' ? 'Tambah Karyawan' : 'Edit Karyawan'}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 1 }}>
                {mode === 'add' ? 'Isi data karyawan baru' : 'Ubah data karyawan'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-3)' }}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          {errorMsg && (
            <div style={{ background: 'var(--rose-light)', border: '1px solid var(--rose-border)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rose)', fontSize: '0.8rem', fontWeight: 700 }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} /> {errorMsg}
            </div>
          )}

          {/* Nama + Perusahaan (wajib) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ gridColumn: '1/-1' }}>
              <FL required>Nama Lengkap</FL>
              <input
                className="input-premium"
                placeholder="Nama karyawan..."
                value={form.name}
                onChange={e => onChange('name', e.target.value)}
                autoFocus
              />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <FL required>Perusahaan / Branch</FL>
              <select className="input-premium cursor-pointer" value={form.companyId} onChange={e => onChange('companyId', e.target.value)}>
                <option value="" disabled>— Pilih Perusahaan —</option>
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Departemen + Jabatan */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <FL>Departemen</FL>
              <input className="input-premium" placeholder="Contoh: Finance, IT..." value={form.department} onChange={e => onChange('department', e.target.value)} />
            </div>
            <div>
              <FL>Jabatan</FL>
              <input className="input-premium" placeholder="Contoh: Manager, Staff..." value={form.role} onChange={e => onChange('role', e.target.value)} />
            </div>
          </div>

          {/* Email + Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <FL>Email</FL>
              <input className="input-premium" type="email" placeholder="nama@perusahaan.com" value={form.email} onChange={e => onChange('email', e.target.value)} />
            </div>
            <div>
              <FL>Status</FL>
              <select className="input-premium cursor-pointer" value={form.status} onChange={e => onChange('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 24px', borderTop: '1px solid var(--border)', background: 'var(--surface-2)', borderRadius: '0 0 20px 20px' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', fontWeight: 700, fontSize: '0.83rem', cursor: 'pointer' }}>
            Batal
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            style={{ padding: '9px 20px', borderRadius: 10, border: 'none', background: saving ? 'var(--border-2)' : 'var(--blue)', color: '#fff', fontWeight: 800, fontSize: '0.83rem', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: saving ? 'none' : '0 4px 12px var(--blue-glow)' }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────
function DeleteModal({ name, deleting, onConfirm, onClose }: { name: string; deleting: boolean; onConfirm: () => void; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget && !deleting) onClose(); }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 400, boxShadow: '0 24px 60px rgba(15,23,42,0.25)', overflow: 'hidden', borderTop: '3px solid var(--rose)' }}>
        <div style={{ padding: '28px 28px 20px', textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--rose-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Trash2 size={24} style={{ color: 'var(--rose)' }} />
          </div>
          <p style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Hapus Karyawan?</p>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
            <strong>{name}</strong> akan dihapus permanen dari sistem. Tindakan ini tidak bisa dibatalkan.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '16px 28px', borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <button onClick={onClose} disabled={deleting} style={{ flex: 1, padding: '9px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', fontWeight: 700, fontSize: '0.83rem', cursor: 'pointer', color: 'var(--text-2)' }}>
            Batal
          </button>
          <button onClick={onConfirm} disabled={deleting} style={{ flex: 1, padding: '9px', borderRadius: 10, border: 'none', background: 'var(--rose)', color: '#fff', fontWeight: 800, fontSize: '0.83rem', cursor: deleting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            {deleting ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────
export default function EmployeesPage() {
  const [employees,  setEmployees]  = useState<Employee[]>([]);
  const [companies,  setCompanies]  = useState<string[]>([]);
  const [allCompanyObjs, setAllCompanyObjs] = useState<Company[]>([]);
  const [total,      setTotal]      = useState(0);
  const [loading,    setLoading]    = useState(true);

  const [search,     setSearch]     = useState('');
  const [company,    setCompany]    = useState('');
  const [offset,     setOffset]     = useState(0);

  // Modal states
  const [modal,       setModal]       = useState<'add' | 'edit' | null>(null);
  const [editTarget,  setEditTarget]  = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [form,        setForm]        = useState<FormState>(EMPTY_FORM);
  const [saving,      setSaving]      = useState(false);
  const [deleting,    setDeleting]    = useState(false);
  const [formError,   setFormError]   = useState('');

  // Fetch employee list
  const fetchData = useCallback(async (q: string, c: string, off: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ mode: 'paginated', search: q, company: c, limit: String(LIMIT), offset: String(off) });
      const res  = await fetch(`/api/employees?${params}`);
      const json = await res.json();
      setEmployees(json.data      || []);
      setTotal(json.total         || 0);
      setCompanies(json.companies || []);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all companies for the form dropdown
  useEffect(() => {
    fetch('/api/master-data?table=m_company')
      .then(r => r.json())
      .then(d => setAllCompanyObjs(d.data || []));
  }, []);

  useEffect(() => { fetchData(search, company, offset); }, [fetchData, search, company, offset]);

  const handleSearch  = (v: string) => { setSearch(v);  setOffset(0); };
  const handleCompany = (v: string) => { setCompany(v); setOffset(0); };

  // Modal helpers
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setModal('add');
  };

  const openEdit = (emp: Employee) => {
    const companyObj = allCompanyObjs.find(c => c.name === emp.company_name);
    setForm({
      name:       emp.name,
      department: emp.department || '',
      role:       emp.role       || '',
      email:      emp.email      || '',
      status:     'Active',
      companyId:  companyObj ? String(companyObj.id) : '',
    });
    setEditTarget(emp);
    setFormError('');
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setEditTarget(null); };

  const handleFormChange = (key: keyof FormState, value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  // Save (add or edit)
  const handleSave = async () => {
    setSaving(true);
    setFormError('');
    try {
      const payload = {
        name:       form.name,
        department: form.department,
        role:       form.role,
        email:      form.email,
        status:     form.status,
        companyId:  Number(form.companyId),
      };

      let res: Response;
      if (modal === 'add') {
        res = await fetch('/api/employees', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } else {
        res = await fetch(`/api/employees/${editTarget!.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }

      const json = await res.json();
      if (!res.ok) { setFormError(json.error || 'Gagal menyimpan data'); return; }

      closeModal();
      fetchData(search, company, offset);
    } catch {
      setFormError('Terjadi kesalahan jaringan');
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res  = await fetch(`/api/employees/${deleteTarget.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) { alert(json.error || 'Gagal menghapus'); return; }
      setDeleteTarget(null);
      fetchData(search, company, offset);
    } finally {
      setDeleting(false);
    }
  };

  const totalPages  = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, background: 'linear-gradient(135deg, var(--indigo), #7c3aed)', boxShadow: '0 8px 20px rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Master Data Karyawan
            </h1>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-2)', marginTop: 2 }}>
              {total > 0 ? `${total} karyawan aktif dari ${companies.length} perusahaan` : 'Memuat data...'}
            </p>
          </div>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--blue), var(--indigo))', color: '#fff', fontWeight: 800, fontSize: '0.83rem', cursor: 'pointer', boxShadow: '0 6px 16px var(--blue-glow)', flexShrink: 0 }}
        >
          <Plus size={16} /> Tambah Karyawan
        </button>
      </div>

      {/* ── Summary chips ── */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {[
          { icon: <Users size={14} style={{ color: 'var(--indigo)' }} />, val: total,            label: 'Total Karyawan' },
          { icon: <Building2 size={14} style={{ color: 'var(--blue)' }} />, val: companies.length, label: 'Perusahaan'    },
        ].map(chip => (
          <div key={chip.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '0.78rem' }}>
            {chip.icon}
            <span style={{ fontWeight: 700, color: 'var(--text)' }}>{chip.val}</span>
            <span style={{ color: 'var(--text-3)' }}>{chip.label}</span>
          </div>
        ))}
        {company && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 12, background: 'var(--blue-light)', border: '1px solid var(--blue-border)', fontSize: '0.78rem', color: 'var(--blue)', fontWeight: 600 }}>
            <Building2 size={13} /> {company}
            <button onClick={() => handleCompany('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--blue)', fontWeight: 800, marginLeft: 2, lineHeight: 1 }}>×</button>
          </div>
        )}
      </div>

      {/* ── Filter bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Cari nama, departemen, jabatan, atau email..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 36px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, fontSize: '0.83rem', color: 'var(--text)', outline: 'none' }}
          />
        </div>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Building2 size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }} />
          <select
            value={company}
            onChange={e => handleCompany(e.target.value)}
            title="Filter perusahaan"
            style={{ padding: '9px 32px 9px 30px', borderRadius: 10, border: company ? '1px solid var(--blue-border)' : '1px solid var(--border)', background: company ? 'var(--blue-light)' : 'var(--surface-2)', fontSize: '0.8rem', fontWeight: company ? 700 : 400, color: company ? 'var(--blue-d)' : 'var(--text-2)', cursor: 'pointer', outline: 'none', minWidth: 200, maxWidth: 280 }}
          >
            <option value="">Semua Perusahaan</option>
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(15,23,42,0.06)' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.4fr 1.8fr 2fr 90px', gap: '0 16px', padding: '12px 24px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <div>Nama Karyawan</div>
          <div>Departemen</div>
          <div>Jabatan</div>
          <div>Email</div>
          <div>Perusahaan / Branch</div>
          <div style={{ textAlign: 'right' }}>Aksi</div>
        </div>

        {/* Body */}
        {loading ? (
          <div style={{ padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--text-3)' }}>
            <Loader2 size={20} className="animate-spin" />
            <span style={{ fontSize: '0.83rem', fontWeight: 600 }}>Memuat data karyawan...</span>
          </div>
        ) : employees.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <Users size={40} style={{ color: 'var(--border)', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-2)' }}>Tidak ada karyawan ditemukan</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: 4 }}>Coba ubah filter atau tambah karyawan baru</p>
          </div>
        ) : (
          employees.map((emp, i) => {
            const initials = getInitials(emp.name);
            const color    = avatarColor(emp.name);
            const isLast   = i === employees.length - 1;
            return (
              <div
                key={emp.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.4fr 1.8fr 2fr 90px', gap: '0 16px', padding: '13px 24px', alignItems: 'center', borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <div className={color} style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.68rem' }}>
                    {initials}
                  </div>
                  <span style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {emp.name}
                  </span>
                </div>

                {/* Department */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={emp.department}>
                  {emp.department || <span style={{ color: 'var(--text-3)' }}>—</span>}
                </div>

                {/* Role */}
                <div>
                  {emp.role ? (
                    <span style={{ display: 'inline-block', maxWidth: '100%', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={emp.role}>
                      {emp.role}
                    </span>
                  ) : <span style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>—</span>}
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
                  {emp.email ? (
                    <>
                      <Mail size={11} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                      <a href={`mailto:${emp.email}`} onClick={e => e.stopPropagation()} style={{ fontSize: '0.75rem', color: 'var(--blue)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: 'none' }} title={emp.email}>
                        {emp.email}
                      </a>
                    </>
                  ) : <span style={{ color: 'var(--text-3)', fontSize: '0.75rem' }}>—</span>}
                </div>

                {/* Company */}
                <div style={{ minWidth: 0 }}>
                  <button onClick={() => handleCompany(emp.company_name)} title={`Filter: ${emp.company_name}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0, maxWidth: '100%' }}>
                    <Building2 size={11} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-2)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={emp.company_name}>
                      {emp.company_name}
                    </span>
                  </button>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                  <button
                    onClick={() => openEdit(emp)}
                    title="Edit"
                    style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--amber-light)'; (e.currentTarget as HTMLElement).style.color = 'var(--amber)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--amber-border)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(emp)}
                    title="Hapus"
                    style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--rose-light)'; (e.currentTarget as HTMLElement).style.color = 'var(--rose)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--rose-border)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {total > LIMIT && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '12px 24px', fontSize: '0.78rem' }}>
          <span style={{ color: 'var(--text-3)', fontWeight: 600, fontSize: '0.72rem' }}>
            Menampilkan <strong style={{ color: 'var(--text)' }}>{offset + 1}–{Math.min(offset + LIMIT, total)}</strong> dari <strong style={{ color: 'var(--text)' }}>{total}</strong> karyawan
          </span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button disabled={currentPage === 1} onClick={() => setOffset(o => Math.max(0, o - LIMIT))}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', fontWeight: 700, fontSize: '0.75rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: 'var(--text-2)', opacity: currentPage === 1 ? 0.4 : 1 }}>
              <ChevronLeft size={14} /> Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(p); return acc;
              }, [])
              .map((p, i) => p === '...'
                ? <span key={`e${i}`} style={{ padding: '0 4px', color: 'var(--text-3)' }}>…</span>
                : <button key={p} onClick={() => setOffset(((p as number) - 1) * LIMIT)}
                    style={{ width: 34, height: 34, borderRadius: 10, border: p === currentPage ? '1px solid var(--blue)' : '1px solid var(--border)', background: p === currentPage ? 'var(--blue)' : 'var(--surface)', color: p === currentPage ? '#fff' : 'var(--text-2)', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
                    {p}
                  </button>
              )}
            <button disabled={currentPage === totalPages} onClick={() => setOffset(o => o + LIMIT)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', fontWeight: 700, fontSize: '0.75rem', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: 'var(--text-2)', opacity: currentPage === totalPages ? 0.4 : 1 }}>
              Berikutnya <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {(modal === 'add' || modal === 'edit') && (
        <EmployeeModal
          mode={modal}
          form={form}
          companies={allCompanyObjs}
          saving={saving}
          errorMsg={formError}
          onChange={handleFormChange}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          deleting={deleting}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
