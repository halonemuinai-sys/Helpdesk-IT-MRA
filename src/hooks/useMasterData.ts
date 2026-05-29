'use client';

import { useState, useEffect, useCallback } from 'react';

export interface MasterDataItem {
  id: number;
  category: string;
  value: string;
}

export function useMasterData(category: string) {
  const [items,   setItems]   = useState<MasterDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/master-data?category=${encodeURIComponent(category)}`)
      .then(r => r.json())
      .then(d => setItems(d.data || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => { load(); }, [load]);

  const addItem = useCallback(async (value: string) => {
    const res  = await fetch('/api/master-data', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ category, value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menambah data');
    load();
    return data.data as MasterDataItem;
  }, [category, load]);

  const removeItem = useCallback(async (id: number) => {
    const res  = await fetch(`/api/master-data?table=m_master_data&id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menghapus data');
    load();
  }, [load]);

  return { items, loading, error, refetch: load, addItem, removeItem };
}
