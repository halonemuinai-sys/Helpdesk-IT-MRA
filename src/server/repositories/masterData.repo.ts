import { query } from '@/lib/db';
import type { AllowedTable } from '@/server/validators/masterData.validator';

export interface MasterDataRow { id: number; category: string; value: string }
export interface GenericRow    { id: number; name: string }

export async function findMasterDataByCategory(category: string): Promise<MasterDataRow[]> {
  const res = await query(
    `SELECT id, category, value FROM m_master_data WHERE category = $1 ORDER BY value ASC`,
    [category]
  );
  return res.rows as MasterDataRow[];
}

export async function findAllMasterData(): Promise<MasterDataRow[]> {
  const res = await query(
    `SELECT id, category, value FROM m_master_data ORDER BY category, value ASC`
  );
  return res.rows as MasterDataRow[];
}

export async function findFromTable(table: AllowedTable): Promise<unknown[]> {
  const res = await query(`SELECT * FROM ${table} ORDER BY name ASC`);
  return res.rows;
}

export async function insertMasterData(category: string, value: string): Promise<MasterDataRow> {
  const res = await query(
    `INSERT INTO m_master_data (category, value) VALUES ($1, $2) RETURNING *`,
    [category, value]
  );
  return res.rows[0] as MasterDataRow;
}

export async function insertIntoTable(table: AllowedTable, name: string): Promise<GenericRow> {
  const res = await query(
    `INSERT INTO ${table} (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return res.rows[0] as GenericRow;
}

export async function deleteFromTable(table: AllowedTable, id: number): Promise<boolean> {
  const res = await query(
    `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
    [id]
  );
  return (res.rowCount ?? 0) > 0;
}
