import { editEmployee, removeEmployee } from '@/server/services/employee.service';
import { validateEmployee } from '@/server/validators/employee.validator';
import * as R from '@/server/lib/response';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId  = parseInt(id);
    if (!numId) return R.badRequest('ID tidak valid');

    const body   = await request.json();
    const parsed = validateEmployee(body);
    if ('error' in parsed) return R.badRequest(parsed.error);

    const data = await editEmployee(numId, parsed.data);
    return R.ok({ data });
  } catch (e: any) {
    if (e.code === 'NOT_FOUND') return R.notFound(e.message);
    if (e.code === '23505')    return R.conflict('Email karyawan sudah terdaftar');
    return R.serverError('Failed to update employee', '[employees] PUT');
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId  = parseInt(id);
    if (!numId) return R.badRequest('ID tidak valid');

    await removeEmployee(numId);
    return R.ok({ success: true });
  } catch (e: any) {
    if (e.code === 'NOT_FOUND') return R.notFound(e.message);
    return R.serverError('Failed to delete employee', '[employees] DELETE');
  }
}
