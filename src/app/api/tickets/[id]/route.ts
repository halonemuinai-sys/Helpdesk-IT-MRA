import { updateTicket, deleteTicket } from '@/server/services/ticket.service';
import { validateUpdateTicket } from '@/server/validators/ticket.validator';
import * as R from '@/server/lib/response';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return R.badRequest('Ticket ID is required');

    const body   = await request.json();
    const parsed = validateUpdateTicket(body);
    if ('error' in parsed) return R.badRequest(parsed.error);

    await updateTicket(id, parsed.data);
    return R.ok({ success: true });
  } catch (e: any) {
    if (e.code === 'NOT_FOUND') return R.notFound(e.message);
    return R.serverError('Failed to update ticket', '[tickets] PUT');
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return R.badRequest('Ticket ID is required');

    await deleteTicket(id);
    return R.ok({ success: true });
  } catch (e: any) {
    return R.serverError('Failed to delete ticket', '[tickets] DELETE');
  }
}
