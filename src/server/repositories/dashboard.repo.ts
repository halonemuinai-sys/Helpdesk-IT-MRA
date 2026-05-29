import { query } from '@/lib/db';

export interface KpiRow {
  total_tickets:          string;
  open_tickets:           string;
  in_progress_tickets:    string;
  pending_vendor_tickets: string;
  resolved_tickets:       string;
  sla_achieved:           string;
  sla_breached:           string;
}

export interface LocationCountRow  { location: string; count: string }
export interface CategoryCountRow  { category: string; count: string }
export interface AvgTimeRow        { avg_response: string | null; avg_resolve: string | null }
export interface DowntimeRow       { location: string; count: string; total_minutes: string | null }

export async function fetchKpi(): Promise<KpiRow> {
  const res = await query(`
    SELECT
      COUNT(*)                                                        AS total_tickets,
      COUNT(CASE WHEN status = 'Open'                     THEN 1 END) AS open_tickets,
      COUNT(CASE WHEN status = 'In Progress'              THEN 1 END) AS in_progress_tickets,
      COUNT(CASE WHEN status = 'Pending Vendor'           THEN 1 END) AS pending_vendor_tickets,
      COUNT(CASE WHEN status IN ('Resolved','Closed')     THEN 1 END) AS resolved_tickets,
      COUNT(CASE WHEN sla_status = 'Achieved'             THEN 1 END) AS sla_achieved,
      COUNT(CASE WHEN sla_status = 'Breached'             THEN 1 END) AS sla_breached
    FROM helpdesk_tickets
  `);
  return res.rows[0] as KpiRow;
}

export async function fetchPerLocation(): Promise<LocationCountRow[]> {
  const res = await query(
    `SELECT location, COUNT(*) AS count FROM helpdesk_tickets GROUP BY location ORDER BY count DESC`
  );
  return res.rows as LocationCountRow[];
}

export async function fetchPerCategory(): Promise<CategoryCountRow[]> {
  const res = await query(
    `SELECT category, COUNT(*) AS count FROM helpdesk_tickets GROUP BY category ORDER BY count DESC`
  );
  return res.rows as CategoryCountRow[];
}

export async function fetchAvgResponseTime(): Promise<string | null> {
  const res = await query(`
    SELECT AVG(
      EXTRACT(EPOCH FROM (
        (response_date + response_time)::timestamp - (ticket_date + ticket_time)::timestamp
      )) / 60
    ) AS avg_response
    FROM helpdesk_tickets
    WHERE response_date IS NOT NULL AND response_time IS NOT NULL
      AND (response_date + response_time) >= (ticket_date + ticket_time)
  `);
  return res.rows[0].avg_response as string | null;
}

export async function fetchAvgResolveTime(): Promise<string | null> {
  const res = await query(`
    SELECT AVG(
      EXTRACT(EPOCH FROM (
        (resolved_date + resolved_time)::timestamp - (ticket_date + ticket_time)::timestamp
      )) / 60
    ) AS avg_resolve
    FROM helpdesk_tickets
    WHERE resolved_date IS NOT NULL AND resolved_time IS NOT NULL
      AND (resolved_date + resolved_time) >= (ticket_date + ticket_time)
  `);
  return res.rows[0].avg_resolve as string | null;
}

export async function fetchDowntimePerLocation(): Promise<DowntimeRow[]> {
  const res = await query(`
    SELECT
      location,
      COUNT(*) AS count,
      SUM(EXTRACT(EPOCH FROM (
        (resolved_date + resolved_time)::timestamp - (ticket_date + ticket_time)::timestamp
      )) / 60) AS total_minutes
    FROM helpdesk_tickets
    WHERE impact_level = 'Sistem Down'
      AND resolved_date IS NOT NULL AND resolved_time IS NOT NULL
    GROUP BY location
  `);
  return res.rows as DowntimeRow[];
}

export async function fetchOpenDowntimePerLocation(): Promise<LocationCountRow[]> {
  const res = await query(`
    SELECT location, COUNT(*) AS count
    FROM helpdesk_tickets
    WHERE impact_level = 'Sistem Down'
      AND status NOT IN ('Resolved','Closed')
    GROUP BY location
  `);
  return res.rows as LocationCountRow[];
}
