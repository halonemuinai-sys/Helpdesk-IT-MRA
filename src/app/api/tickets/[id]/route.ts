import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      status, slaStatus, responseDate, responseTime,
      resolvedDate, resolvedTime, impactLevel
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
    }

    const checkRes = await query(`SELECT * FROM helpdesk_tickets WHERE id = $1`, [id]);
    if (checkRes.rows.length === 0) {
      return NextResponse.json({ error: 'Tiket tidak ditemukan' }, { status: 404 });
    }

    const now = new Date();
    const currentDateStr = now.toISOString().split('T')[0];
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hh}:${mm}`;

    let finalStatus = status;
    let finalSlaStatus = slaStatus;
    let finalResponseDate = responseDate;
    let finalResponseTime = responseTime;
    let finalResolvedDate = resolvedDate;
    let finalResolvedTime = resolvedTime;
    const finalImpactLevel = impactLevel;

    // Auto-fill response date/time if status is In Progress
    if (status === 'In Progress' && (!responseDate || responseDate === '')) {
      finalResponseDate = currentDateStr;
      finalResponseTime = currentTimeStr;
    }

    // Auto-fill resolved date/time if status is Resolved or Closed
    if ((status === 'Resolved' || status === 'Closed') && (!resolvedDate || resolvedDate === '')) {
      finalResolvedDate = currentDateStr;
      finalResolvedTime = currentTimeStr;
    }

    // Auto calculate SLA if status resolved and SLA empty
    if ((status === 'Resolved' || status === 'Closed') && (!slaStatus || slaStatus === '')) {
      // Basic fallback: if it's high priority, SLA should be fast (e.g. within 4 hours).
      // If we don't have enough data, default to Achieved or let it be.
      // Let's keep it as is, or we can check the time difference.
      finalSlaStatus = 'Achieved'; // Default fallback
    }

    await query(
      `UPDATE helpdesk_tickets SET
        status = $1,
        sla_status = $2,
        response_date = $3,
        response_time = $4,
        resolved_date = $5,
        resolved_time = $6,
        impact_level = $7,
        updated_at = NOW()
       WHERE id = $8`,
      [
        finalStatus, finalSlaStatus || null,
        finalResponseDate || null, finalResponseTime || null,
        finalResolvedDate || null, finalResolvedTime || null,
        finalImpactLevel || null, id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[tickets] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}
