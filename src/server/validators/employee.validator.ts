type Result<T> = { error: string } | { data: T };

export interface EmployeeBody {
  name: string;
  department?: string;
  role?: string;
  email?: string;
  status?: string;
  companyId: number;
}

function str(v: unknown): string | undefined {
  return typeof v === 'string' ? v.trim() || undefined : undefined;
}

export function validateEmployee(body: unknown): Result<EmployeeBody> {
  if (typeof body !== 'object' || body === null)
    return { error: 'Request body tidak valid' };

  const b = body as Record<string, unknown>;

  if (!str(b.name))
    return { error: 'Nama karyawan wajib diisi' };

  const companyId = Number(b.companyId);
  if (!companyId || isNaN(companyId) || companyId <= 0)
    return { error: 'Perusahaan wajib dipilih' };

  const status = str(b.status);
  if (status && !['Active', 'Inactive'].includes(status))
    return { error: 'Status tidak valid' };

  return {
    data: {
      name:       str(b.name)!,
      department: str(b.department),
      role:       str(b.role),
      email:      str(b.email),
      status:     status ?? 'Active',
      companyId,
    },
  };
}
