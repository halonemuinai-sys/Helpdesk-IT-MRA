import { query } from '@/lib/db';

export interface UserRow {
  id: number;
  full_name: string;
  email: string;
  role: string;
  password: string;
}

export async function findActiveUserByEmail(email: string): Promise<UserRow | null> {
  const res = await query(
    `SELECT id, full_name, email, role, password
     FROM m_user
     WHERE LOWER(email) = $1 AND is_active = TRUE
     LIMIT 1`,
    [email]
  );
  return (res.rows[0] as UserRow) ?? null;
}

export async function updateUserPassword(id: number, hashedPassword: string): Promise<void> {
  await query(`UPDATE m_user SET password = $1 WHERE id = $2`, [hashedPassword, id]);
}
