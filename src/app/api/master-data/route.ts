import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const allowedTables = ['m_company', 'm_division', 'm_location', 'm_master_data'];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') || 'm_master_data';
    const category = searchParams.get('category');

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    if (table === 'm_master_data' && category) {
      const res = await query(
        `SELECT id, category, value FROM m_master_data WHERE category = $1 ORDER BY value ASC`,
        [category]
      );
      return NextResponse.json({ data: res.rows });
    }

    const sortColumn = table === 'm_location' ? 'id' : 'name';
    const queryStr = table === 'm_master_data'
      ? `SELECT id, category, value FROM m_master_data ORDER BY category, value ASC`
      : `SELECT * FROM ${table} ORDER BY ${sortColumn === 'id' ? 'id' : 'name'} ASC`;
      
    const res = await query(queryStr);
    return NextResponse.json({ data: res.rows });
  } catch (error) {
    console.error('[master-data] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch master data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { table, name, category, value, building, floor, room } = body;

    const targetTable = table || 'm_master_data';
    if (!allowedTables.includes(targetTable)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    let res;
    if (targetTable === 'm_master_data') {
      if (!category || !value) {
        return NextResponse.json({ error: 'Category and value are required' }, { status: 400 });
      }
      res = await query(
        `INSERT INTO m_master_data (category, value) VALUES ($1, $2) RETURNING *`,
        [category, value.trim()]
      );
    } else if (targetTable === 'm_location') {
      if (!building) {
        return NextResponse.json({ error: 'Building name is required' }, { status: 400 });
      }
      res = await query(
        `INSERT INTO m_location (building, floor, room) VALUES ($1, $2, $3) RETURNING *`,
        [building.trim(), floor ? floor.trim() : null, room ? room.trim() : null]
      );
    } else {
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
      res = await query(
        `INSERT INTO ${targetTable} (name) VALUES ($1) RETURNING *`,
        [name.trim()]
      );
    }

    return NextResponse.json({ data: res.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('[master-data] POST error:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Data sudah ada!' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to save master data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') || 'm_master_data';
    const id = searchParams.get('id');

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const res = await query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [parseInt(id)]);
    if (res.rowCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: res.rows[0] });
  } catch (error: any) {
    console.error('[master-data] DELETE error:', error);
    if (error.code === '23503') {
      return NextResponse.json({ error: 'Data ini sedang digunakan di tabel lain' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to delete master data' }, { status: 500 });
  }
}
