'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TicketDTO } from '@/server/services/ticket.service';

export type { TicketDTO };

interface UseTicketsOptions {
  status?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
  month?: number | null;
  year?: number | null;
  autoFetch?: boolean;
}

export function useTickets(options: UseTicketsOptions = {}) {
  const { autoFetch = true, ...filters } = options;

  const [tickets, setTickets] = useState<TicketDTO[]>([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const fetch_ = useCallback(async (overrides?: Partial<UseTicketsOptions>) => {
    setLoading(true);
    setError('');
    const merged = { ...filters, ...overrides };
    const params = new URLSearchParams();
    if (merged.status)      params.set('status',  merged.status);
    if (merged.searchQuery) params.set('query',   merged.searchQuery);
    if (merged.limit)       params.set('limit',   String(merged.limit));
    if (merged.offset)      params.set('offset',  String(merged.offset));
    if (merged.month != null) params.set('month', String(merged.month));
    if (merged.year  != null) params.set('year',  String(merged.year));

    try {
      const res  = await fetch(`/api/tickets?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memuat tiket');
      setTickets(data.data || []);
      setTotal(data.total  || 0);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { if (autoFetch) fetch_(); }, [autoFetch, fetch_]);

  const createTicket = useCallback(async (body: Record<string, unknown>) => {
    const res  = await fetch('/api/tickets', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal membuat tiket');
    return data.data as TicketDTO;
  }, []);

  const updateTicket = useCallback(async (id: string, body: Record<string, unknown>) => {
    const res  = await fetch(`/api/tickets/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal mengupdate tiket');
    return data;
  }, []);

  const deleteTicket = useCallback(async (id: string) => {
    const res  = await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menghapus tiket');
    return data;
  }, []);

  return { tickets, total, loading, error, refetch: fetch_, createTicket, updateTicket, deleteTicket };
}
