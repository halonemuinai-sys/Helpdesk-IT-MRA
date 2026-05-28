import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // 1. KPI Counts
    const kpiRes = await query(`
      SELECT 
        COUNT(*) as total_tickets,
        COUNT(CASE WHEN status = 'Open' THEN 1 END) as open_tickets,
        COUNT(CASE WHEN status = 'In Progress' THEN 1 END) as in_progress_tickets,
        COUNT(CASE WHEN status = 'Pending Vendor' THEN 1 END) as pending_vendor_tickets,
        COUNT(CASE WHEN status IN ('Resolved', 'Closed') THEN 1 END) as resolved_tickets,
        COUNT(CASE WHEN sla_status = 'Achieved' THEN 1 END) as sla_achieved,
        COUNT(CASE WHEN sla_status = 'Breached' THEN 1 END) as sla_breached
      FROM helpdesk_tickets
    `);

    const kpi = kpiRes.rows[0];
    const totalTickets = parseInt(kpi.total_tickets || '0');
    const openTickets = parseInt(kpi.open_tickets || '0');
    const inProgressTickets = parseInt(kpi.in_progress_tickets || '0');
    const pendingVendor = parseInt(kpi.pending_vendor_tickets || '0');
    const resolvedTickets = parseInt(kpi.resolved_tickets || '0');
    const slaAchieved = parseInt(kpi.sla_achieved || '0');
    const slaBreached = parseInt(kpi.sla_breached || '0');
    const slaPending = totalTickets - slaAchieved - slaBreached;

    const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;

    // 2. Tickets per Location
    const locRes = await query(`
      SELECT location, COUNT(*) as count 
      FROM helpdesk_tickets 
      GROUP BY location 
      ORDER BY count DESC
    `);
    const perLocation: Record<string, number> = {};
    locRes.rows.forEach(r => {
      perLocation[r.location] = parseInt(r.count);
    });

    // 3. Tickets per Category
    const catRes = await query(`
      SELECT category, COUNT(*) as count 
      FROM helpdesk_tickets 
      GROUP BY category 
      ORDER BY count DESC
    `);
    const perCategory: Record<string, number> = {};
    catRes.rows.forEach(r => {
      perCategory[r.category] = parseInt(r.count);
    });

    // 4. Avg Response & Resolution Time (Minutes)
    // We calculate using EXTRACT(EPOCH FROM (timestamp2 - timestamp1)) / 60
    const timeRes = await query(`
      SELECT 
        AVG(EXTRACT(EPOCH FROM (
          (response_date + response_time) - (ticket_date + ticket_time)
        )) / 60) as avg_response,
        AVG(EXTRACT(EPOCH FROM (
          (resolved_date + resolved_time) - (ticket_date + ticket_time)
        )) / 60) as avg_resolve
      FROM helpdesk_tickets
      WHERE 
        ticket_date IS NOT NULL AND ticket_time IS NOT NULL
    `);

    const times = timeRes.rows[0];
    // Filter down to only valid positive values (in case of data anomalies)
    const avgResponseRes = await query(`
      SELECT AVG(EXTRACT(EPOCH FROM ((response_date + response_time)::timestamp - (ticket_date + ticket_time)::timestamp)) / 60) as avg_response
      FROM helpdesk_tickets 
      WHERE response_date IS NOT NULL AND response_time IS NOT NULL AND (response_date + response_time) >= (ticket_date + ticket_time)
    `);
    const avgResolveRes = await query(`
      SELECT AVG(EXTRACT(EPOCH FROM ((resolved_date + resolved_time)::timestamp - (ticket_date + ticket_time)::timestamp)) / 60) as avg_resolve
      FROM helpdesk_tickets 
      WHERE resolved_date IS NOT NULL AND resolved_time IS NOT NULL AND (resolved_date + resolved_time) >= (ticket_date + ticket_time)
    `);

    const avgResponseMinutes = Math.round(parseFloat(avgResponseRes.rows[0].avg_response || '0'));
    const avgResolveMinutes = Math.round(parseFloat(avgResolveRes.rows[0].avg_resolve || '0'));

    // 5. Downtime per Location (tickets with impactLevel = 'Sistem Down')
    const downtimeRes = await query(`
      SELECT 
        location,
        COUNT(*) as count,
        SUM(EXTRACT(EPOCH FROM ((resolved_date + resolved_time)::timestamp - (ticket_date + ticket_time)::timestamp)) / 60) as total_minutes
      FROM helpdesk_tickets
      WHERE impact_level = 'Sistem Down' AND resolved_date IS NOT NULL AND resolved_time IS NOT NULL
      GROUP BY location
    `);
    
    const downtimePerLocation: Record<string, { count: number; totalMinutes: number }> = {};
    downtimeRes.rows.forEach(r => {
      downtimePerLocation[r.location] = {
        count: parseInt(r.count),
        totalMinutes: Math.round(parseFloat(r.total_minutes || '0'))
      };
    });

    // Also get counts for open "Sistem Down" incidents that haven't been resolved yet
    const openDownRes = await query(`
      SELECT location, COUNT(*) as count 
      FROM helpdesk_tickets 
      WHERE impact_level = 'Sistem Down' AND status NOT IN ('Resolved', 'Closed')
      GROUP BY location
    `);
    openDownRes.rows.forEach(r => {
      if (!downtimePerLocation[r.location]) {
        downtimePerLocation[r.location] = { count: 0, totalMinutes: 0 };
      }
      downtimePerLocation[r.location].count += parseInt(r.count);
    });

    return NextResponse.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      pendingVendor,
      resolvedTickets,
      perLocation,
      perCategory,
      slaAchieved,
      slaBreached,
      slaPending,
      downtimePerLocation,
      resolutionRate,
      avgResponseMinutes,
      avgResolveMinutes
    });
  } catch (error) {
    console.error('[dashboard] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard metrics' }, { status: 500 });
  }
}
