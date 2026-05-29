import { login }          from '@/server/services/auth.service';
import { validateLogin }   from '@/server/validators/auth.validator';
import { signSession, COOKIE_NAME, EXPIRES_IN } from '@/lib/jwt';
import * as R from '@/server/lib/response';

export async function POST(request: Request) {
  try {
    const body   = await request.json();
    const parsed = validateLogin(body);
    if ('error' in parsed) return R.badRequest(parsed.error);

    const user = await login(parsed.data.email, parsed.data.password);

    // Sign JWT
    const token = await signSession({
      id:    user.id,
      name:  user.fullName,
      email: user.email,
      role:  user.role,
    });

    const response = R.ok({ success: true, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } });

    // httpOnly cookie — tidak bisa dibaca JS browser
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   EXPIRES_IN,
      path:     '/',
    });

    // Hapus cookie lama yang tidak aman
    response.cookies.delete('user_role');
    response.cookies.delete('user_full_name');

    return response;
  } catch (e: any) {
    if (e.code === 'UNAUTHORIZED') return R.unauthorized(e.message);
    return R.serverError('Terjadi kesalahan sistem', '[auth] POST');
  }
}

export async function DELETE() {
  const response = R.ok({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
