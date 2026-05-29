import { query } from '@/lib/db';

export interface EmployeeRow {
  id: number;
  name: string;
  email: string;
  company_name: string;
}

export interface EmployeeDetailRow extends EmployeeRow {
  department: string;
  role: string;
}

export interface EmployeeFilters {
  search?: string;
  company?: string;
  limit?: number;
  offset?: number;
}

export async function findActiveEmployees(): Promise<EmployeeRow[]> {
  const res = await query(
    `SELECT e.id, e.name, e.email, c.name as company_name
     FROM m_employee e
     LEFT JOIN m_company c ON e.company_id = c.id
     WHERE e.status = 'Active'
     ORDER BY e.name ASC`
  );
  return res.rows as EmployeeRow[];
}

export async function findEmployeesPaginated(
  filters: EmployeeFilters
): Promise<{ rows: EmployeeDetailRow[]; total: number }> {
  const { search = '', company = '', limit = 50, offset = 0 } = filters;

  let sql = `
    SELECT e.id, e.name, e.department, e.role, e.email, c.name as company_name
    FROM m_employee e
    LEFT JOIN m_company c ON e.company_id = c.id
    WHERE e.status = 'Active'
  `;
  const params: unknown[] = [];

  if (search.trim()) {
    params.push(`%${search.trim()}%`);
    sql += ` AND (e.name ILIKE $${params.length} OR e.email ILIKE $${params.length} OR e.department ILIKE $${params.length} OR e.role ILIKE $${params.length})`;
  }

  if (company.trim()) {
    params.push(company.trim());
    sql += ` AND c.name = $${params.length}`;
  }

  const countRes = await query(`SELECT COUNT(*) FROM (${sql}) AS t`, params);
  const total = parseInt(countRes.rows[0].count);

  sql += ` ORDER BY e.name ASC`;
  params.push(limit);
  sql += ` LIMIT $${params.length}`;
  params.push(offset);
  sql += ` OFFSET $${params.length}`;

  const res = await query(sql, params);
  return { rows: res.rows as EmployeeDetailRow[], total };
}

export interface UpsertEmployeeData {
  name: string;
  department?: string;
  role?: string;
  email?: string;
  status?: string;
  companyId: number;
}

export async function insertEmployee(data: UpsertEmployeeData): Promise<EmployeeDetailRow> {
  const res = await query(
    `INSERT INTO m_employee (name, department, role, email, status, company_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, department, role, email,
       (SELECT name FROM m_company WHERE id = $6) AS company_name`,
    [data.name, data.department || null, data.role || null,
     data.email || null, data.status || 'Active', data.companyId]
  );
  return res.rows[0] as EmployeeDetailRow;
}

export async function updateEmployee(id: number, data: UpsertEmployeeData): Promise<EmployeeDetailRow | null> {
  const res = await query(
    `UPDATE m_employee SET
       name       = $1,
       department = $2,
       role       = $3,
       email      = $4,
       status     = $5,
       company_id = $6
     WHERE id = $7
     RETURNING id, name, department, role, email,
       (SELECT name FROM m_company WHERE id = $6) AS company_name`,
    [data.name, data.department || null, data.role || null,
     data.email || null, data.status || 'Active', data.companyId, id]
  );
  return (res.rows[0] as EmployeeDetailRow) ?? null;
}

export async function deleteEmployee(id: number): Promise<boolean> {
  const res = await query(
    `DELETE FROM m_employee WHERE id = $1 RETURNING id`, [id]
  );
  return (res.rowCount ?? 0) > 0;
}

export async function findAllCompanyNames(): Promise<string[]> {
  const res = await query(
    `SELECT DISTINCT c.name
     FROM m_company c
     INNER JOIN m_employee e ON e.company_id = c.id
     WHERE e.status = 'Active'
     ORDER BY c.name ASC`
  );
  return res.rows.map((r: { name: string }) => r.name);
}
