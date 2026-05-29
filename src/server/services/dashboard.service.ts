import * as repo from '@/server/repositories/dashboard.repo';

export async function getDashboardMetrics() {
  const [
    kpiRow,
    locRows,
    catRows,
    avgResponse,
    avgResolve,
    downtimeRows,
    openDownRows,
  ] = await Promise.all([
    repo.fetchKpi(),
    repo.fetchPerLocation(),
    repo.fetchPerCategory(),
    repo.fetchAvgResponseTime(),
    repo.fetchAvgResolveTime(),
    repo.fetchDowntimePerLocation(),
    repo.fetchOpenDowntimePerLocation(),
  ]);

  const totalTickets    = parseInt(kpiRow.total_tickets    || '0');
  const resolvedTickets = parseInt(kpiRow.resolved_tickets || '0');
  const slaAchieved     = parseInt(kpiRow.sla_achieved     || '0');
  const slaBreached     = parseInt(kpiRow.sla_breached     || '0');
  const slaPending      = totalTickets - slaAchieved - slaBreached;
  const resolutionRate  = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;

  const perLocation: Record<string, number> = {};
  locRows.forEach(r => { perLocation[r.location] = parseInt(r.count); });

  const perCategory: Record<string, number> = {};
  catRows.forEach(r => { perCategory[r.category] = parseInt(r.count); });

  const downtimePerLocation: Record<string, { count: number; totalMinutes: number }> = {};
  downtimeRows.forEach(r => {
    downtimePerLocation[r.location] = {
      count:        parseInt(r.count),
      totalMinutes: Math.round(parseFloat(r.total_minutes || '0')),
    };
  });
  openDownRows.forEach(r => {
    if (!downtimePerLocation[r.location])
      downtimePerLocation[r.location] = { count: 0, totalMinutes: 0 };
    downtimePerLocation[r.location].count += parseInt(r.count);
  });

  return {
    totalTickets,
    openTickets:        parseInt(kpiRow.open_tickets           || '0'),
    inProgressTickets:  parseInt(kpiRow.in_progress_tickets    || '0'),
    pendingVendor:      parseInt(kpiRow.pending_vendor_tickets  || '0'),
    resolvedTickets,
    perLocation,
    perCategory,
    slaAchieved,
    slaBreached,
    slaPending,
    downtimePerLocation,
    resolutionRate,
    avgResponseMinutes: Math.round(parseFloat(avgResponse || '0')),
    avgResolveMinutes:  Math.round(parseFloat(avgResolve  || '0')),
  };
}
