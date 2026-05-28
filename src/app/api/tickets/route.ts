import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const searchQuery = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const month = searchParams.get('month'); // 0-11
    const year = searchParams.get('year');

    let sql = `SELECT * FROM helpdesk_tickets WHERE 1=1`;
    const params: unknown[] = [];

    // Filter by status
    if (status !== 'all') {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      params.push(`%${searchQuery.trim()}%`);
      sql += ` AND (id ILIKE $${params.length} OR reporter_name ILIKE $${params.length} OR issue_title ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }

    // Filter by month & year (for reports)
    if (month !== null && year !== null) {
      const monthNum = parseInt(month) + 1;
      const yearNum = parseInt(year);
      params.push(yearNum);
      sql += ` AND EXTRACT(YEAR FROM ticket_date) = $${params.length}`;
      params.push(monthNum);
      sql += ` AND EXTRACT(MONTH FROM ticket_date) = $${params.length}`;
    }

    // Get total count for pagination
    const countRes = await query(`SELECT COUNT(*) FROM (${sql}) as temp`, params);
    const total = parseInt(countRes.rows[0].count);

    // Sorting: Open status first, then by priority (Critical, High, Medium, Low), then by date/time desc
    sql += ` ORDER BY 
      CASE status
        WHEN 'Open' THEN 1
        WHEN 'In Progress' THEN 2
        WHEN 'Pending Vendor' THEN 3
        WHEN 'Resolved' THEN 4
        WHEN 'Closed' THEN 5
        ELSE 6
      END ASC,
      CASE priority
        WHEN 'Critical' THEN 1
        WHEN 'High' THEN 2
        WHEN 'Medium' THEN 3
        WHEN 'Low' THEN 4
        ELSE 5
      END ASC,
      ticket_date DESC, ticket_time DESC`;

    // Pagination
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
    params.push(offset);
    sql += ` OFFSET $${params.length}`;

    const res = await query(sql, params);
    
    // Format response to match front-end
    const tickets = res.rows.map(row => ({
      id: row.id,
      reporterName: row.reporter_name,
      ticketSource: row.ticket_source,
      ticketDate: row.ticket_date ? new Date(row.ticket_date).toISOString().split('T')[0] : '',
      ticketTime: row.ticket_time ? row.ticket_time.substring(0, 5) : '',
      location: row.location,
      category: row.category,
      issueTitle: row.issue_title,
      description: row.description,
      priority: row.priority,
      status: row.status,
      responseDate: row.response_date ? new Date(row.response_date).toISOString().split('T')[0] : '',
      responseTime: row.response_time ? row.response_time.substring(0, 5) : '',
      resolvedDate: row.resolved_date ? new Date(row.resolved_date).toISOString().split('T')[0] : '',
      resolvedTime: row.resolved_time ? row.resolved_time.substring(0, 5) : '',
      slaStatus: row.sla_status,
      impactLevel: row.impact_level
    }));

    return NextResponse.json({ data: tickets, total });
  } catch (error) {
    console.error('[tickets] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      reporterName, ticketSource, ticketDate, ticketTime,
      location, category, issueTitle, description, priority, impactLevel
    } = body;

    if (!reporterName || !ticketSource || !location || !category || !issueTitle || !description) {
      return NextResponse.json({ error: 'Mohon lengkapi seluruh field wajib.' }, { status: 400 });
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${date}`; // YYYYMMDD
    
    // Query today's ticket count for running sequence number
    const seqRes = await query(
      `SELECT COUNT(*) FROM helpdesk_tickets WHERE id LIKE $1`,
      [`HD-${dateStr}-%`]
    );
    const count = parseInt(seqRes.rows[0].count);
    const seq = String(count + 1).padStart(3, '0');
    const ticketId = `HD-${dateStr}-${seq}`;

    const finalDate = ticketDate || `${year}-${month}-${date}`;
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const finalTime = ticketTime || `${hh}:${mm}`;

    const res = await query(
      `INSERT INTO helpdesk_tickets (
        id, reporter_name, ticket_source, ticket_date, ticket_time,
        location, category, issue_title, description, priority, status, impact_level
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        ticketId, reporterName, ticketSource, finalDate, finalTime,
        location, category, issueTitle, description, priority || 'Medium', 'Open', impactLevel || ''
      ]
    );

    return NextResponse.json({ success: true, data: res.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('[tickets] POST error:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}
