import {
  HardDrive, Code, Network, Monitor,
  Mail, Printer, Settings, HelpCircle,
  type LucideIcon,
} from 'lucide-react';

export function getAvatarBgColor(name: string): string {
  if (!name) return 'bg-slate-100 text-slate-500';
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  const colors = [
    'bg-blue-light text-blue dark:bg-blue/15 dark:text-blue-d',
    'bg-emerald-light text-emerald dark:bg-emerald/15 dark:text-emerald',
    'bg-amber-light text-amber dark:bg-amber/15 dark:text-amber',
    'bg-rose-light text-rose dark:bg-rose/15 dark:text-rose',
    'bg-indigo-light text-indigo dark:bg-indigo/15 dark:text-indigo',
  ];
  return colors[code % colors.length];
}

export function getTicketInitials(name: string): string {
  if (!name) return 'IT';
  const parts = name.split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();
}

export function getCategoryIcon(category: string): LucideIcon {
  const cat = (category || '').toLowerCase();
  if (cat.includes('hard') || cat.includes('fisik'))                              return HardDrive;
  if (cat.includes('soft') || cat.includes('os') || cat.includes('sistem'))       return Code;
  if (cat.includes('jar') || cat.includes('inter') || cat.includes('net'))        return Network;
  if (cat.includes('retail') || cat.includes('pos'))                              return Monitor;
  if (cat.includes('mail') || cat.includes('outlook') || cat.includes('collab'))  return Mail;
  if (cat.includes('print') || cat.includes('scan'))                              return Printer;
  if (cat.includes('main') || cat.includes('rutin'))                              return Settings;
  return HelpCircle;
}

export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const idx = parseInt(month, 10) - 1;
  return `${parseInt(day, 10)} ${months[idx] ?? month} ${year}`;
}

export const PRIORITY_COLORS: Record<string, string> = {
  Low:      'badge-slate',
  Medium:   'badge-amber',
  High:     'badge-rose',
  Critical: 'badge-rose animate-pulse',
};

export const STATUS_COLORS: Record<string, string> = {
  Open:             'badge-rose',
  'In Progress':    'badge-blue',
  'Pending Vendor': 'badge-amber',
  Resolved:         'badge-emerald',
  Closed:           'badge-slate',
};
