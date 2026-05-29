import { query } from '@/lib/db';

export interface TicketRow {
  id: string;
  reporter_name: string;
  ticket_source: string;
  ticket_date: Date | null;
  ticket_time: string | null;
  location: string;
  category: string;
  issue_title: string;
  description: string;
  priority: string;
  status: string;
  response_date: Date | null;
  response_time: string | null;
  resolved_date: Date | null;
  resolved_time: string | null;
  sla_status: string | null;
  impact_level: string | null;
}

export interface TicketFilters {
  status?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
  month?: number | null;
  year?: number | null;
}

export interface CreateTicketData {
  ticketId: string;
  reporterName: string;
  ticketSource: string;
  ticketDate: string;
  ticketTime: string;
  location: string;
  category: string;
  issueTitle: string;
  description: string;
  priority: string;
  impactLevel: string;
}

export interface UpdateTicketData {
  status?: string;
  slaStatus?: string | null;
  responseDate?: string | null;
  responseTime?: string | null;
  resolvedDate?: string | null;
  resolvedTime?: string | null;
  impactLevel?: string | null;
}

export async function findTickets(
  filters: TicketFilters
): Promise<{ rows: TicketRow[]; total: number }> {
  const { status = 'all', searchQuery = '', limit = 50, offset = 0, month, year } = filters;

  let sql = `SELECT * FROM helpdesk_tickets WHERE 1=1`;
  const params: unknown[] = [];

  if (status !== 'all') {
    params.push(status);
    sql += ` AND status = $${params.length}`;
  }

  if (searchQuery.trim()) {
    params.push(`%${searchQuery.trim()}%`);
    sql += ` AND (id ILIKE $${params.length} OR reporter_name ILIKE $${params.length} OR issue_title ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  if (month != null && year != null) {
    params.push(year);
    sql += ` AND EXTRACT(YEAR FROM ticket_date) = $${params.length}`;
    params.push(month + 1);
    sql += ` AND EXTRACT(MONTH FROM ticket_date) = $${params.length}`;
  }

  const countRes = await query(`SELECT COUNT(*) FROM (${sql}) as t`, params);
  const total = parseInt(countRes.rows[0].count);

  sql += ` ORDER BY
    CASE status
      WHEN 'Open'           THEN 1
      WHEN 'In Progress'    THEN 2
      WHEN 'Pending Vendor' THEN 3
      WHEN 'Resolved'       THEN 4
      WHEN 'Closed'         THEN 5
      ELSE 6
    END ASC,
    CASE priority
      WHEN 'Critical' THEN 1
      WHEN 'High'     THEN 2
      WHEN 'Medium'   THEN 3
      WHEN 'Low'      THEN 4
      ELSE 5
    END ASC,
    ticket_date DESC, ticket_time DESC`;

  params.push(limit);
  sql += ` LIMIT $${params.length}`;
  params.push(offset);
  sql += ` OFFSET $${params.length}`;

  const res = await query(sql, params);
  return { rows: res.rows as TicketRow[], total };
}

export async function findTicketById(id: string): Promise<TicketRow | null> {
  const res = await query(`SELECT * FROM helpdesk_tickets WHERE id = $1`, [id]);
  return (res.rows[0] as TicketRow) ?? null;
}

export async function countTodayTickets(dateStr: string): Promise<number> {
  const res = await query(
    `SELECT COUNT(*) FROM helpdesk_tickets WHERE id LIKE $1`,
    [`HD-${dateStr}-%`]
  );
  return parseInt(res.rows[0].count);
}

export async function insertTicket(data: CreateTicketData): Promise<TicketRow> {
  const res = await query(
    `INSERT INTO helpdesk_tickets (
      id, reporter_name, ticket_source, ticket_date, ticket_time,
      location, category, issue_title, description, priority, status, impact_level
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
      data.ticketId, data.reporterName, data.ticketSource,
      data.ticketDate, data.ticketTime,
      data.location, data.category, data.issueTitle,
      data.description, data.priority, 'Open', data.impactLevel,
    ]
  );
  return res.rows[0] as TicketRow;
}

export async function updateTicket(id: string, data: UpdateTicketData): Promise<void> {
  await query(
    `UPDATE helpdesk_tickets SET
      status        = $1,
      sla_status    = $2,
      response_date = $3,
      response_time = $4,
      resolved_date = $5,
      resolved_time = $6,
      impact_level  = $7,
      updated_at    = NOW()
     WHERE id = $8`,
    [
      data.status,
      data.slaStatus   ?? null,
      data.responseDate ?? null, data.responseTime ?? null,
      data.resolvedDate ?? null, data.resolvedTime ?? null,
      data.impactLevel  ?? null,
      id,
    ]
  );
}

export async function deleteTicket(id: string): Promise<void> {
  await query(`DELETE FROM helpdesk_tickets WHERE id = $1`, [id]);
}
