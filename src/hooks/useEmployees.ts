'use client';

import { useState, useEffect } from 'react';
import type { EmployeeDTO } from '@/server/services/employee.service';

export type { EmployeeDTO };

export function useEmployees() {
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/employees')
      .then(r => r.json())
      .then(d => setEmployees(d.data || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { employees, loading, error };
}
