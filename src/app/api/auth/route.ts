import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Direct check of m_user table (plain text password check for Laragon local dev)
    const res = await query(
      `SELECT id, full_name, email, role, password FROM m_user WHERE LOWER(email) = $1 AND is_active = TRUE LIMIT 1`,
      [trimmedEmail]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'User tidak ditemukan atau tidak aktif' }, { status: 401 });
    }

    const user = res.rows[0];

    // Simple plain text password check for local dev
    // If you need hashing in production, you can use bcrypt/argon2 here.
    if (user.password !== password) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 });
    }

    // Prepare response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    });

    // Save cookies (non-httpOnly so client shell can read the role for menus)
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    response.cookies.set('user_role', user.role, { path: '/', maxAge, sameSite: 'lax' });
    response.cookies.set('user_full_name', user.full_name, { path: '/', maxAge, sameSite: 'lax' });

    return response;
  } catch (error) {
    console.error('[auth] Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
