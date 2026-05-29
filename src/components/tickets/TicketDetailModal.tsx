'use client';

import { X, Save, Loader2 } from 'lucide-react';
import { Badge, FormError, DatePickerPremium } from '@/components/PageShared';
import { PRIORITY_COLORS } from '@/lib/ticketUtils';

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

interface DropdownItem { id: number; category: string; value: string }

interface Props {
  ticket:          Ticket;
  editStatus:      string;
  editSla:         string;
  editResponseDate: string;
  editResponseTime: string;
  editResolvedDate: string;
  editResolvedTime: string;
  editImpact:      string;
  saving:          boolean;
  saveError:       string;
  impacts:         DropdownItem[];
  onStatusChange:  (v: string) => void;
  onSlaChange:     (v: string) => void;
  onResponseDate:  (v: string) => void;
  onResponseTime:  (v: string) => void;
  onResolvedDate:  (v: string) => void;
  onResolvedTime:  (v: string) => void;
  onImpactChange:  (v: string) => void;
  onSubmit:        (e: React.FormEvent) => void;
  onClose:         () => void;
}

export function TicketDetailModal({
  ticket, editStatus, editSla, editResponseDate, editResponseTime,
  editResolvedDate, editResolvedTime, editImpact, saving, saveError,
  impacts, onStatusChange, onSlaChange, onResponseDate, onResponseTime,
  onResolvedDate, onResolvedTime, onImpactChange, onSubmit, onClose,
}: Props) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container modal-md max-w-lg">
        <div className="modal-header">
          <div>
            <span className="modal-title">Detail Tiket IT Helpdesk</span>
            <div className="text-[10px] font-mono text-text-3 mt-0.5">{ticket.id}</div>
          </div>
          <button onClick={onClose} className="btn-icon cursor-pointer" title="Tutup">
            <X size={15} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="modal-body space-y-4">
          <FormError msg={saveError} />

          {/* Ticket info read-only */}
          <div className="bg-surface-2 dark:bg-slate-800/50 rounded-xl p-4 border border-border space-y-2 text-xs">
            {[
              ['Pelapor',      ticket.reporterName],
              ['Ticket Source', ticket.ticketSource],
              ['Waktu Lapor',  `${ticket.ticketDate} ${ticket.ticketTime}`],
              ['Lokasi',       ticket.location],
              ['Kategori',     ticket.category],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span className="text-text-2 font-semibold">{label}</span>
                <span className="text-text font-medium">{val}</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span className="text-text-2 font-semibold">Prioritas</span>
              <Badge label={ticket.priority} colorClass={PRIORITY_COLORS[ticket.priority]} />
            </div>
            <div className="pt-2 border-t border-border mt-2">
              <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Judul Masalah</div>
              <p className="font-bold text-text leading-relaxed">{ticket.issueTitle}</p>
            </div>
            <div className="pt-2 border-t border-border mt-2">
              <div className="text-[10px] font-bold text-text-3 uppercase tracking-wider mb-1">Deskripsi Gangguan</div>
              <p className="text-text-2 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Status + SLA */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Status Tiket</label>
              <select title="Status" className="input-premium font-bold cursor-pointer"
                value={editStatus} onChange={e => onStatusChange(e.target.value)}>
                {['Open','In Progress','Pending Vendor','Resolved','Closed'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Status SLA</label>
              <select title="SLA" className="input-premium font-bold cursor-pointer"
                value={editSla} onChange={e => onSlaChange(e.target.value)}>
                <option value="">-- Belum --</option>
                <option value="Achieved">Achieved</option>
                <option value="Breached">Breached</option>
              </select>
            </div>
          </div>

          {/* Response dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Tgl Respon Awal</label>
              <DatePickerPremium value={editResponseDate} onChange={onResponseDate} />
            </div>
            <div>
              <label className="form-label">Jam Respon Awal</label>
              <input type="time" title="Response Time" className="input-premium text-xs"
                value={editResponseTime} onChange={e => onResponseTime(e.target.value)} />
            </div>
          </div>

          {/* Resolved dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Tgl Selesai</label>
              <DatePickerPremium value={editResolvedDate} onChange={onResolvedDate} />
            </div>
            <div>
              <label className="form-label">Jam Selesai</label>
              <input type="time" title="Resolved Time" className="input-premium text-xs"
                value={editResolvedTime} onChange={e => onResolvedTime(e.target.value)} />
            </div>
          </div>

          {/* Impact */}
          <div>
            <label className="form-label">Dampak Kestabilan & Ketersediaan</label>
            <select title="Dampak" className="input-premium font-bold cursor-pointer"
              value={editImpact} onChange={e => onImpactChange(e.target.value)}>
              <option value="">-- Pilih Dampak --</option>
              {impacts.map(i => <option key={i.id} value={i.value}>{i.value}</option>)}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="btn cursor-pointer" disabled={saving}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary cursor-pointer" disabled={saving}>
              {saving
                ? <><Loader2 size={15} className="animate-spin" /> Menyimpan...</>
                : <><Save size={15} /> Simpan Perubahan</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
