import * as repo from '@/server/repositories/ticket.repo';
import type { CreateTicketBody, UpdateTicketBody } from '@/server/validators/ticket.validator';

export interface TicketDTO {
  id: string;
  reporterName: string;
  ticketSource: string;
  ticketDate: string;
  ticketTime: string;
  location: string;
  category: string;
  issueTitle: string;
  description: string;
  priority: string;
  status: string;
  responseDate: string;
  responseTime: string;
  resolvedDate: string;
  resolvedTime: string;
  slaStatus: string | null;
  impactLevel: string | null;
}

function toDTO(row: repo.TicketRow): TicketDTO {
  return {
    id:           row.id,
    reporterName: row.reporter_name,
    ticketSource: row.ticket_source,
    ticketDate:   row.ticket_date ? new Date(row.ticket_date).toISOString().split('T')[0] : '',
    ticketTime:   row.ticket_time ? row.ticket_time.substring(0, 5) : '',
    location:     row.location,
    category:     row.category,
    issueTitle:   row.issue_title,
    description:  row.description,
    priority:     row.priority,
    status:       row.status,
    responseDate: row.response_date ? new Date(row.response_date).toISOString().split('T')[0] : '',
    responseTime: row.response_time ? row.response_time.substring(0, 5) : '',
    resolvedDate: row.resolved_date ? new Date(row.resolved_date).toISOString().split('T')[0] : '',
    resolvedTime: row.resolved_time ? row.resolved_time.substring(0, 5) : '',
    slaStatus:    row.sla_status,
    impactLevel:  row.impact_level,
  };
}

export async function listTickets(filters: {
  status?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
  month?: number | null;
  year?: number | null;
}): Promise<{ data: TicketDTO[]; total: number }> {
  const { rows, total } = await repo.findTickets(filters);
  return { data: rows.map(toDTO), total };
}

export async function createTicket(input: CreateTicketBody): Promise<TicketDTO> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm   = String(now.getMonth() + 1).padStart(2, '0');
  const dd   = String(now.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  const count = await repo.countTodayTickets(dateStr);
  const seq   = String(count + 1).padStart(3, '0');

  const hh  = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  const row = await repo.insertTicket({
    ticketId:     `HD-${dateStr}-${seq}`,
    reporterName: input.reporterName,
    ticketSource: input.ticketSource,
    ticketDate:   input.ticketDate   || `${yyyy}-${mm}-${dd}`,
    ticketTime:   input.ticketTime   || `${hh}:${min}`,
    location:     input.location,
    category:     input.category,
    issueTitle:   input.issueTitle,
    description:  input.description,
    priority:     input.priority     || 'Medium',
    impactLevel:  input.impactLevel  || '',
  });

  return toDTO(row);
}

export async function updateTicket(id: string, input: UpdateTicketBody): Promise<void> {
  const existing = await repo.findTicketById(id);
  if (!existing) throw Object.assign(new Error('Tiket tidak ditemukan'), { code: 'NOT_FOUND' });

  const now = new Date();
  const today   = now.toISOString().split('T')[0];
  const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  let responseDate = input.responseDate ?? null;
  let responseTime = input.responseTime ?? null;
  let resolvedDate = input.resolvedDate ?? null;
  let resolvedTime = input.resolvedTime ?? null;
  let slaStatus    = input.slaStatus    ?? null;

  if (input.status === 'In Progress' && !responseDate) {
    responseDate = today;
    responseTime = nowTime;
  }

  if ((input.status === 'Resolved' || input.status === 'Closed') && !resolvedDate) {
    resolvedDate = today;
    resolvedTime = nowTime;
  }

  if ((input.status === 'Resolved' || input.status === 'Closed') && !slaStatus) {
    slaStatus = 'Achieved';
  }

  await repo.updateTicket(id, {
    status:       input.status,
    slaStatus,
    responseDate, responseTime,
    resolvedDate, resolvedTime,
    impactLevel:  input.impactLevel ?? null,
  });
}

export async function deleteTicket(id: string): Promise<void> {
  await repo.deleteTicket(id);
}
