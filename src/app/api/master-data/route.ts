import { getMasterData, createMasterData, deleteMasterData } from '@/server/services/masterData.service';
import { validateTable, validateCreateMasterData } from '@/server/validators/masterData.validator';
import * as R from '@/server/lib/response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table    = searchParams.get('table') || 'm_master_data';
    const category = searchParams.get('category');

    const tableCheck = validateTable(table);
    if ('error' in tableCheck) return R.badRequest(tableCheck.error);

    const data = await getMasterData(tableCheck.data, category);
    return R.ok({ data });
  } catch (e: any) {
    return R.serverError('Failed to fetch master data', '[master-data] GET');
  }
}

export async function POST(request: Request) {
  try {
    const body   = await request.json();
    const parsed = validateCreateMasterData(body);
    if ('error' in parsed) return R.badRequest(parsed.error);

    const data = await createMasterData(parsed.data);
    return R.created({ data });
  } catch (e: any) {
    if (e.code === '23505') return R.conflict('Data sudah ada!');
    return R.serverError('Failed to save master data', '[master-data] POST');
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') || 'm_master_data';
    const id    = searchParams.get('id');

    const tableCheck = validateTable(table);
    if ('error' in tableCheck) return R.badRequest(tableCheck.error);
    if (!id) return R.badRequest('ID is required');

    const deleted = await deleteMasterData(tableCheck.data, parseInt(id));
    if (!deleted) return R.notFound('Record not found');

    return R.ok({ success: true });
  } catch (e: any) {
    if (e.code === '23503') return R.conflict('Data ini sedang digunakan di tabel lain');
    return R.serverError('Failed to delete master data', '[master-data] DELETE');
  }
}
