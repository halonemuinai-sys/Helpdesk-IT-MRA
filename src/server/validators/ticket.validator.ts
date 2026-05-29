const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'] as const;
const VALID_STATUSES   = ['Open', 'In Progress', 'Pending Vendor', 'Resolved', 'Closed'] as const;

export interface CreateTicketBody {
  reporterName: string;
  ticketSource: string;
  ticketDate?: string;
  ticketTime?: string;
  location: string;
  category: string;
  issueTitle: string;
  description: string;
  priority?: string;
  impactLevel?: string;
}

export interface UpdateTicketBody {
  status?: string;
  slaStatus?: string;
  responseDate?: string;
  responseTime?: string;
  resolvedDate?: string;
  resolvedTime?: string;
  impactLevel?: string;
}

type Result<T> = { error: string } | { data: T };

function str(v: unknown): string | undefined {
  return typeof v === 'string' ? v.trim() || undefined : undefined;
}

export function validateCreateTicket(body: unknown): Result<CreateTicketBody> {
  if (typeof body !== 'object' || body === null)
    return { error: 'Request body tidak valid' };

  const b = body as Record<string, unknown>;
  const required: (keyof CreateTicketBody)[] = [
    'reporterName', 'ticketSource', 'location', 'category', 'issueTitle', 'description',
  ];

  for (const field of required) {
    if (!str(b[field]))
      return { error: `Field '${field}' wajib diisi.` };
  }

  const priority = str(b.priority);
  if (priority && !VALID_PRIORITIES.includes(priority as never))
    return { error: `Priority tidak valid. Pilihan: ${VALID_PRIORITIES.join(', ')}` };

  return {
    data: {
      reporterName: str(b.reporterName)!,
      ticketSource: str(b.ticketSource)!,
      ticketDate:   str(b.ticketDate),
      ticketTime:   str(b.ticketTime),
      location:     str(b.location)!,
      category:     str(b.category)!,
      issueTitle:   str(b.issueTitle)!,
      description:  str(b.description)!,
      priority,
      impactLevel:  str(b.impactLevel),
    },
  };
}

export function validateUpdateTicket(body: unknown): Result<UpdateTicketBody> {
  if (typeof body !== 'object' || body === null)
    return { error: 'Request body tidak valid' };

  const b = body as Record<string, unknown>;
  const status = str(b.status);
  if (status && !VALID_STATUSES.includes(status as never))
    return { error: `Status tidak valid. Pilihan: ${VALID_STATUSES.join(', ')}` };

  return {
    data: {
      status,
      slaStatus:    str(b.slaStatus),
      responseDate: str(b.responseDate),
      responseTime: str(b.responseTime),
      resolvedDate: str(b.resolvedDate),
      resolvedTime: str(b.resolvedTime),
      impactLevel:  str(b.impactLevel),
    },
  };
}
