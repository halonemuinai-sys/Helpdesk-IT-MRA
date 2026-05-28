'use client';

import { ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import React from 'react';

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
