import * as repo from '@/server/repositories/masterData.repo';
import type { AllowedTable } from '@/server/validators/masterData.validator';
import type { CreateMasterDataBody } from '@/server/validators/masterData.validator';

export async function getMasterData(table: AllowedTable, category?: string | null) {
  if (table === 'm_master_data' && category) {
    return repo.findMasterDataByCategory(category);
  }
  if (table === 'm_master_data') {
    return repo.findAllMasterData();
  }
  return repo.findFromTable(table);
}

export async function createMasterData(input: CreateMasterDataBody) {
  if (input.table === 'm_master_data') {
    return repo.insertMasterData(input.category!, input.value!);
  }
  return repo.insertIntoTable(input.table, input.name!);
}

export async function deleteMasterData(table: AllowedTable, id: number): Promise<boolean> {
  return repo.deleteFromTable(table, id);
}
