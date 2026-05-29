export const ALLOWED_TABLES = ['m_company', 'm_master_data'] as const;
export type AllowedTable = typeof ALLOWED_TABLES[number];

type Result<T> = { error: string } | { data: T };

function str(v: unknown): string | undefined {
  return typeof v === 'string' ? v.trim() || undefined : undefined;
}

export function validateTable(table: unknown): Result<AllowedTable> {
  if (!ALLOWED_TABLES.includes(table as AllowedTable))
    return { error: 'Nama tabel tidak valid' };
  return { data: table as AllowedTable };
}

export interface CreateMasterDataBody {
  table: AllowedTable;
  name?: string;
  category?: string;
  value?: string;
}

export function validateCreateMasterData(body: unknown): Result<CreateMasterDataBody> {
  if (typeof body !== 'object' || body === null)
    return { error: 'Request body tidak valid' };

  const b = body as Record<string, unknown>;
  const table = str(b.table) ?? 'm_master_data';
  const tableCheck = validateTable(table);
  if ('error' in tableCheck) return tableCheck;

  if (table === 'm_master_data') {
    if (!str(b.category) || !str(b.value))
      return { error: 'Category dan value wajib diisi' };
  } else {
    if (!str(b.name))
      return { error: 'Name wajib diisi' };
  }

  return {
    data: {
      table:    table as AllowedTable,
      name:     str(b.name),
      category: str(b.category),
      value:    str(b.value),
    },
  };
}
