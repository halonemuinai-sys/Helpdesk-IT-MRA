import { getDashboardMetrics } from '@/server/services/dashboard.service';
import * as R from '@/server/lib/response';

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    return R.ok(metrics);
  } catch (e: any) {
    return R.serverError('Failed to fetch dashboard metrics', '[dashboard] GET');
  }
}
