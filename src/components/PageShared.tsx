'use client';

import { ChevronLeft, ChevronRight, X, AlertCircle, Calendar } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

// Badge
export function Badge({ label, colorClass = 'badge-slate' }: { label: string; colorClass?: string }) {
  return (
    <span className={`badge ${colorClass}`}>
      {label || '—'}
    </span>
  );
}

// Modal Shell
export function ModalShell({ 
  onClose, title, children, footer, size = 'md', overlayClassName = '', containerClassName = '',
  closeOnClickOutside = true 
}: {
  onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode; size?: 'sm' | 'md' | 'lg';
  overlayClassName?: string;
  containerClassName?: string;
  closeOnClickOutside?: boolean;
}) {
  return (
    <div className={`modal-overlay ${overlayClassName}`} onClick={e => { if (closeOnClickOutside && e.target === e.currentTarget) onClose(); }}>
      <div className={`modal-container modal-${size} ${containerClassName}`}>
        {title && (
          <div className="modal-header">
            <span className="modal-title">{title}</span>
            <button 
              type="button"
              onClick={onClose} 
              className="btn-icon" 
              title="Tutup"
              aria-label="Tutup modal"
            >
              <X size={15} />
            </button>
          </div>
        )}
        <div className="modal-body" style={{ overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// Form Field
export function FF({ label, required, children, id }: { label: string; required?: boolean; children: React.ReactNode; id?: string }) {
  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {label}{required && <span className="text-rose-600 dark:text-rose-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// Section Label
export function SLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-wider text-text-3 mb-2.5">
      {children}
    </p>
  );
}

// Pagination
export function Pagination({ page, totalPages, onChange }: {
  page: number; totalPages: number; onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <button 
        type="button" 
        title="Halaman sebelumnya" 
        aria-label="Halaman sebelumnya"
        className="pagination-btn"
        onClick={() => onChange(page - 1)} 
        disabled={page === 1}
      >
        <ChevronLeft size={15} />
      </button>

      {pages.map((p, i) =>
        p === '...'
          ? <span key={`ellipsis-${i}`} className="text-text-3 px-1">…</span>
          : (
            <button 
              type="button" 
              key={`page-${p}`} 
              className={`pagination-btn ${p === page ? 'active' : ''}`}
              onClick={() => onChange(p as number)}
            >
              {p}
            </button>
          )
      )}

      <button 
        type="button" 
        title="Halaman berikutnya" 
        aria-label="Halaman berikutnya"
        className="pagination-btn"
        onClick={() => onChange(page + 1)} 
        disabled={page === totalPages}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// Form Error
export function FormError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-lg p-3 text-rose-600 dark:text-rose-400">
      <AlertCircle size={15} className="shrink-0" />
      <span className="text-xs font-bold">{msg}</span>
    </div>
  );
}

// Table Shell
export function TableShell({ headers, children, loading, colSpan }: {
  headers: { label: React.ReactNode; right?: boolean; width?: string | number }[];
  children: React.ReactNode;
  loading?: boolean;
  colSpan: number;
}) {
  return (
    <div className="table-shell">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th 
                  key={i} 
                  className={h.right ? 'text-right' : 'text-left'}
                  style={h.width ? { width: h.width } : {}}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colSpan} className="py-14 text-center">
                  <div className="w-6 h-6 border-2 border-border border-t-blue rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Detail Info Row
export function InfoRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-border-subtle last:border-0 text-xs">
      <span className="text-text-2 shrink-0">{label}</span>
      <span className="text-text font-bold text-right">{value || '—'}</span>
    </div>
  );
}

// Section Box
export function SBox({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden mb-4">
      <div className="bg-surface-2 px-4 py-3 border-b border-border flex items-center gap-2">
        {icon && <span className="text-blue">{icon}</span>}
        <span className="text-xs font-bold text-text uppercase tracking-wider">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// Skeleton loading placeholders
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`card animate-pulse-shimmer flex flex-col gap-3 p-5 ${className}`}>
      <div className="h-3 w-2/5 bg-border rounded-md" />
      <div className="h-8 w-3/5 bg-border rounded-md" />
      <div className="h-4 w-4/5 bg-border rounded-md mt-2" />
    </div>
  );
}

export function SkeletonTable({ colSpan, rowCount = 5 }: { colSpan: number; rowCount?: number }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rIdx) => (
        <tr key={rIdx} className="border-b border-border-subtle animate-pulse-shimmer">
          {Array.from({ length: colSpan }).map((_, cIdx) => (
            <td key={cIdx} className="py-4 px-4">
              <div 
                className="h-3 bg-border rounded-md" 
                style={{ width: cIdx === 0 ? '60%' : cIdx === colSpan - 1 ? '40%' : '80%' }} 
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// Custom Premium DatePicker (replaces browser's default calendar popup)
export function DatePickerPremium({ 
  value, 
  onChange, 
  placeholder = 'Pilih tanggal...',
  required = false
}: {
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Date parsing helper
  const parseValueDate = (val: string): Date => {
    if (!val) return new Date();
    const parts = val.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      return new Date(y, m, d);
    }
    return new Date();
  };

  const selectedDate = value ? parseValueDate(value) : null;
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());

  // Update view date when value changes
  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplay = (date: Date | null): string => {
    if (!date) return '';
    const d = String(date.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const formatDateStr = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Grid Calculation
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // Sunday = 0, Monday = 1...
  const numDaysCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const numDaysPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const days = [];

  // Prefix cells (previous month)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = numDaysPrevMonth - i;
    days.push({
      date: new Date(viewYear, viewMonth - 1, d),
      isCurrentMonth: false
    });
  }

  // Current month cells
  for (let d = 1; d <= numDaysCurrentMonth; d++) {
    days.push({
      date: new Date(viewYear, viewMonth, d),
      isCurrentMonth: true
    });
  }

  // Suffix cells (next month) to complete 6 rows (42 cells)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({
      date: new Date(viewYear, viewMonth + 1, d),
      isCurrentMonth: false
    });
  }

  const handleDayClick = (date: Date) => {
    onChange(formatDateStr(date));
    setIsOpen(false);
  };

  const handleMonthChange = (offset: number) => {
    setViewDate(new Date(viewYear, viewMonth + offset, 1));
  };

  const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Years range from currentYear - 5 to currentYear + 5
  const yearsList = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    yearsList.push(y);
  }

  const handleYearSelect = (newYear: number) => {
    setViewDate(new Date(newYear, viewMonth, 1));
  };

  const handleMonthSelect = (newMonth: number) => {
    setViewDate(new Date(viewYear, newMonth, 1));
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input Display wrapper */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center cursor-pointer select-none"
      >
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          required={required}
          value={formatDisplay(selectedDate)}
          className="input-premium pr-10 cursor-pointer text-left text-xs font-semibold"
        />
        <Calendar 
          size={16} 
          className="absolute right-3.5 text-text-3 pointer-events-none transition-colors group-hover:text-text-2" 
        />
      </div>

      {/* Calendar Dropdown Popup */}
      {isOpen && (
        <div 
          className="absolute left-0 mt-1.5 p-3.5 w-64 rounded-xl border border-border bg-surface shadow-hero z-[999] select-none animate-slide-up"
          style={{ background: 'var(--surface)' }}
        >
          {/* Calendar Selectors Header */}
          <div className="flex items-center justify-between gap-1.5 mb-3">
            <div className="flex items-center gap-1">
              <select
                title="Bulan"
                value={viewMonth}
                onChange={e => handleMonthSelect(parseInt(e.target.value))}
                className="py-1 px-1.5 rounded-lg border border-border text-[11px] font-bold cursor-pointer w-24 bg-transparent outline-none appearance-none"
                style={{ backgroundImage: 'none', paddingRight: '6px' }}
              >
                {monthsList.map((m, idx) => (
                  <option key={idx} value={idx}>{m}</option>
                ))}
              </select>

              <select
                title="Tahun"
                value={viewYear}
                onChange={e => handleYearSelect(parseInt(e.target.value))}
                className="py-1 px-1.5 rounded-lg border border-border text-[11px] font-bold cursor-pointer w-16 bg-transparent outline-none appearance-none"
                style={{ backgroundImage: 'none', paddingRight: '6px' }}
              >
                {yearsList.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                className="p-1 rounded-md border border-border/60 hover:bg-surface-2"
                title="Sebelumnya"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                className="p-1 rounded-md border border-border/60 hover:bg-surface-2"
                title="Berikutnya"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Weekday Initials Grid */}
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, idx) => (
              <div 
                key={day} 
                className={`text-center text-[10px] font-extrabold ${
                  idx === 0 ? 'text-rose' : idx === 6 ? 'text-blue' : 'text-text-3'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Numbers Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((item, idx) => {
              const active = isSelected(item.date);
              const today = isToday(item.date);

              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleDayClick(item.date)}
                  className={`h-7 w-7 rounded-lg text-[11px] font-semibold flex items-center justify-center transition-all ${
                    active 
                      ? 'bg-blue text-white shadow-md shadow-blue/20 ring-1 ring-blue-d' 
                      : today
                      ? 'border border-blue text-blue font-bold'
                      : item.isCurrentMonth
                      ? 'text-text hover:bg-surface-2 hover:text-blue'
                      : 'text-text-3 opacity-40 hover:bg-surface-2'
                  }`}
                >
                  {item.date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Quick Action Footer */}
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-border/60 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => { onChange(''); setIsOpen(false); }}
              className="text-text-3 hover:text-rose transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => { onChange(formatDateStr(new Date())); setIsOpen(false); }}
              className="text-blue hover:text-blue-d transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
