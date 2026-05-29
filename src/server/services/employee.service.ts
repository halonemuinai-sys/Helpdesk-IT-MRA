import * as repo from '@/server/repositories/employee.repo';
import type { EmployeeBody } from '@/server/validators/employee.validator';

export type EmployeeDTO       = repo.EmployeeRow;
export type EmployeeDetailDTO = repo.EmployeeDetailRow;

export async function listEmployees(): Promise<EmployeeDTO[]> {
  return repo.findActiveEmployees();
}

export async function listEmployeesPaginated(filters: {
  search?: string;
  company?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: EmployeeDetailDTO[]; total: number }> {
  const { rows, total } = await repo.findEmployeesPaginated(filters);
  return { data: rows, total };
}

export async function listCompanyNames(): Promise<string[]> {
  return repo.findAllCompanyNames();
}

export async function createEmployee(input: EmployeeBody): Promise<EmployeeDetailDTO> {
  return repo.insertEmployee(input);
}

export async function editEmployee(id: number, input: EmployeeBody): Promise<EmployeeDetailDTO> {
  const result = await repo.updateEmployee(id, input);
  if (!result) throw Object.assign(new Error('Karyawan tidak ditemukan'), { code: 'NOT_FOUND' });
  return result;
}

export async function removeEmployee(id: number): Promise<void> {
  const ok = await repo.deleteEmployee(id);
  if (!ok) throw Object.assign(new Error('Karyawan tidak ditemukan'), { code: 'NOT_FOUND' });
}
