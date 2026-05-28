'use client';

import { useEffect, useState } from 'react';
import { Database, Plus, Trash2, Loader2 } from 'lucide-react';
import { Badge, ModalShell, FF, FormError, TableShell } from '@/components/PageShared';

const masterTables = [
  { id: 'm_company', label: 'Perusahaan (Company)' },
  { id: 'm_division', label: 'Divisi (Division)' },
  { id: 'm_location', label: 'Lokasi (Location)' },
  { id: 'm_master_data', label: 'Referensi Dropdown (HD_Data)' },
];

export default function MasterDataConfigPage() {
  const [activeTable, setActiveTable] = useState(masterTables[0].id);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('HD_Kategori');
  const [formBuilding, setFormBuilding] = useState('');
  const [formFloor, setFormFloor] = useState('');
  const [formRoom, setFormRoom] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async (table: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/master-data?table=${table}`);
      const json = await res.json();
      if (res.ok) {
        setData(json.data || []);
      } else {
        alert(json.error || 'Gagal memuat data');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTable);
  }, [activeTable]);

  const handleOpenModal = () => {
    setErrorMsg('');
    setFormName('');
    setFormBuilding('');
    setFormFloor('');
    setFormRoom('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    setErrorMsg('');
    try {
      let body: any = { table: activeTable };

      if (activeTable === 'm_master_data') {
        if (!formName.trim()) throw new Error('Nilai tidak boleh kosong');
        body.category = formCategory;
        body.value = formName.trim();
      } else if (activeTable === 'm_location') {
        if (!formBuilding.trim()) throw new Error('Gedung tidak boleh kosong');
        body.building = formBuilding.trim();
        body.floor = formFloor.trim();
        body.room = formRoom.trim();
      } else {
        if (!formName.trim()) throw new Error('Nama tidak boleh kosong');
        body.name = formName.trim();
      }

      const res = await fetch('/api/master-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.error || 'Gagal menyimpan data');
      
      setShowModal(false);
      loadData(activeTable); // reload
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (item: any) => {
    setDeleteItem(item);
  };

  const executeDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/master-data?table=${activeTable}&id=${deleteItem.id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal menghapus data');
      
      setDeleteItem(null);
      loadData(activeTable);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Master Data Config
          </h1>
          <p className="text-xs text-text-2">Kelola data referensi utama sistem helpdesk</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-4 bg-white dark:bg-slate-900">
            <p className="text-[10px] font-bold mb-3 text-text-3 uppercase tracking-wider">PILIH TABEL</p>
            <div className="flex flex-col gap-2">
              {masterTables.map(t => (
                <button
                  key={t.id}
                  className={`text-left px-4 py-2.5 rounded-xl font-bold text-xs transition-all border ${
                    activeTable === t.id 
                      ? 'bg-blue text-white border-blue shadow-md' 
                      : 'bg-surface-2 text-text-2 border-transparent hover:border-border hover:bg-surface'
                  }`}
                  onClick={() => setActiveTable(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="card bg-white dark:bg-slate-900">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold text-text uppercase tracking-wider">
                {masterTables.find(t => t.id === activeTable)?.label}
              </h2>
              <button className="btn btn-primary text-xs py-2" onClick={handleOpenModal}>
                <Plus size={14} /> Tambah Data
              </button>
            </div>

            <TableShell 
              headers={
                activeTable === 'm_master_data'
                  ? [{ label: 'ID' }, { label: 'KATEGORI' }, { label: 'NILAI (VALUE)' }, { label: 'AKSI', right: true }]
                  : activeTable === 'm_location'
                  ? [{ label: 'ID' }, { label: 'LOKASI LENGKAP' }, { label: 'AKSI', right: true }]
                  : [{ label: 'ID' }, { label: 'NAMA' }, { label: 'AKSI', right: true }]
              } 
              loading={loading} 
              colSpan={activeTable === 'm_master_data' ? 4 : 3}
            >
              {data.length === 0 && !loading ? (
                <tr>
                  <td colSpan={activeTable === 'm_master_data' ? 4 : 3} className="text-center py-10 text-text-3">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                data.map(item => (
                  <tr key={item.id} className="hover:bg-surface-2 transition-colors">
                    <td className="w-20"><Badge label={`#${item.id}`} /></td>
                    
                    {activeTable === 'm_master_data' ? (
                      <>
                        <td className="font-semibold text-text-2">{item.category}</td>
                        <td className="font-bold text-text">{item.value}</td>
                      </>
                    ) : activeTable === 'm_location' ? (
                      <td className="font-bold text-text">{item.full_name}</td>
                    ) : (
                      <td className="font-bold text-text">{item.name}</td>
                    )}
                    
                    <td>
                      <div className="flex justify-end">
                        <button 
                          className="btn-icon text-rose hover:bg-rose hover:text-white border-rose-200" 
                          onClick={() => confirmDelete(item)}
                          title="Hapus"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </TableShell>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalShell title="Tambah Data Baru" onClose={() => setShowModal(false)} size="sm">
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <FormError msg={errorMsg} />
            
            {activeTable === 'm_master_data' && (
              <FF label="Kategori Dropdown" required>
                <select
                  title="Dropdown Category"
                  className="input-premium font-semibold cursor-pointer"
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                >
                  <option value="HD_Kategori">Kategori Gangguan (HD_Kategori)</option>
                  <option value="HD_Source">Sumber Laporan (HD_Source)</option>
                  <option value="HD_Dampak">Dampak Gangguan (HD_Dampak)</option>
                </select>
              </FF>
            )}

            {activeTable === 'm_location' ? (
              <>
                <FF label="Gedung / Unit" required>
                  <input
                    type="text"
                    className="input-premium"
                    value={formBuilding}
                    onChange={e => setFormBuilding(e.target.value)}
                    placeholder="E.g. Head Office MRA Retail"
                    required
                  />
                </FF>
                <FF label="Lantai">
                  <input
                    type="text"
                    className="input-premium"
                    value={formFloor}
                    onChange={e => setFormFloor(e.target.value)}
                    placeholder="E.g. Lantai 3"
                  />
                </FF>
                <FF label="Ruang / Area">
                  <input
                    type="text"
                    className="input-premium"
                    value={formRoom}
                    onChange={e => setFormRoom(e.target.value)}
                    placeholder="E.g. IT Room"
                  />
                </FF>
              </>
            ) : (
              <FF label={activeTable === 'm_master_data' ? 'Nilai (Value)' : 'Nama'} required>
                <input
                  type="text"
                  className="input-premium"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="Masukkan data..."
                  required
                  autoFocus
                />
              </FF>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-2">
              <button type="button" className="btn text-xs py-2" onClick={() => setShowModal(false)}>Batal</button>
              <button type="submit" className="btn btn-primary text-xs py-2" disabled={saving}>
                {saving ? <><Loader2 size={12} className="animate-spin" /> Menyimpan...</> : 'Simpan'}
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {deleteItem && (
        <ModalShell 
          title="" 
          onClose={() => !deleting && setDeleteItem(null)} 
          size="sm"
          containerClassName="border-t-4 border-rose"
        >
          <div className="flex flex-col gap-3 text-center items-center py-2">
            <div className="w-12 h-12 bg-rose-light text-rose rounded-full flex items-center justify-center mb-1">
              <Trash2 size={24} />
            </div>
            <h3 className="text-sm font-black text-text">Hapus Data?</h3>
            <p className="text-xs text-text-2">
              Anda yakin ingin menghapus data referensi ini? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3 w-full mt-4">
              <button 
                type="button" 
                className="btn flex-1 justify-center py-2 text-xs" 
                onClick={() => setDeleteItem(null)}
                disabled={deleting}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn bg-rose hover:bg-rose-600 text-white border-none flex-1 justify-center py-2 text-xs" 
                onClick={executeDelete}
                disabled={deleting}
              >
                {deleting ? <Loader2 size={12} className="animate-spin" /> : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}
