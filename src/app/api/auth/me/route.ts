import { verifySession, COOKIE_NAME } from '@/lib/jwt';
import { cookies }                    from 'next/headers';
import * as R from '@/server/lib/response';

export async function GET() {
  try {
    const jar   = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) return R.unauthorized('Tidak ada sesi aktif');

    const session = await verifySession(token);
    if (!session)  return R.unauthorized('Sesi tidak valid atau sudah kadaluarsa');

    return R.ok({
      id:       session.id,
      fullName: session.name,
      email:    session.email,
      role:     session.role,
    });
  } catch {
    return R.serverError('Gagal memverifikasi sesi', '[auth/me] GET');
  }
}
