import { listEmployees, listEmployeesPaginated, listCompanyNames, createEmployee } from '@/server/services/employee.service';
import { validateEmployee } from '@/server/validators/employee.validator';
import * as R from '@/server/lib/response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    if (searchParams.get('mode') === 'paginated') {
      const [result, companies] = await Promise.all([
        listEmployeesPaginated({
          search:  searchParams.get('search')  || '',
          company: searchParams.get('company') || '',
          limit:   parseInt(searchParams.get('limit')  || '50'),
          offset:  parseInt(searchParams.get('offset') || '0'),
        }),
        listCompanyNames(),
      ]);
      return R.ok({ data: result.data, total: result.total, companies });
    }

    const data = await listEmployees();
    return R.ok({ data });
  } catch {
    return R.serverError('Failed to fetch employees', '[employees] GET');
  }
}

export async function POST(request: Request) {
  try {
    const body   = await request.json();
    const parsed = validateEmployee(body);
    if ('error' in parsed) return R.badRequest(parsed.error);

    const data = await createEmployee(parsed.data);
    return R.created({ data });
  } catch (e: any) {
    if (e.code === '23505') return R.conflict('Email karyawan sudah terdaftar');
    return R.serverError('Failed to create employee', '[employees] POST');
  }
}
