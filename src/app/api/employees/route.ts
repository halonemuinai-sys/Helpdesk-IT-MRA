import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query(
      `SELECT e.id, e.name, e.department, e.email, e.location, c.name as company_name 
       FROM m_employee e
       LEFT JOIN m_company c ON e.company_id = c.id
       WHERE e.status = 'Active'
       ORDER BY e.name ASC`
    );
    return NextResponse.json({ data: res.rows });
  } catch (error) {
    console.error('[employees] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}
