import { listTickets, createTicket } from '@/server/services/ticket.service';
import { validateCreateTicket } from '@/server/validators/ticket.validator';
import * as R from '@/server/lib/response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await listTickets({
      status:      searchParams.get('status')  || 'all',
      searchQuery: searchParams.get('query')   || '',
      limit:       parseInt(searchParams.get('limit')  || '50'),
      offset:      parseInt(searchParams.get('offset') || '0'),
      month:       searchParams.get('month') != null ? parseInt(searchParams.get('month')!) : null,
      year:        searchParams.get('year')  != null ? parseInt(searchParams.get('year')!)  : null,
    });
    return R.ok(result);
  } catch (e: any) {
    return R.serverError('Failed to fetch tickets', '[tickets] GET');
  }
}

export async function POST(request: Request) {
  try {
    const body   = await request.json();
    const parsed = validateCreateTicket(body);
    if ('error' in parsed) return R.badRequest(parsed.error);

    const ticket = await createTicket(parsed.data);
    return R.created({ success: true, data: ticket });
  } catch (e: any) {
    return R.serverError('Failed to create ticket', '[tickets] POST');
  }
}
