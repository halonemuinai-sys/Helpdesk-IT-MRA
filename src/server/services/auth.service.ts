import * as repo from '@/server/repositories/auth.repo';
import { hashPassword, verifyPassword, isBcryptHash } from '@/lib/hash';

export interface AuthResult {
  id:       number;
  fullName: string;
  email:    string;
  role:     string;
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const user = await repo.findActiveUserByEmail(email);
  if (!user) {
    throw Object.assign(new Error('User tidak ditemukan atau tidak aktif'), { code: 'UNAUTHORIZED' });
  }

  if (isBcryptHash(user.password)) {
    // Password sudah di-hash — verifikasi dengan bcrypt
    const valid = await verifyPassword(password, user.password);
    if (!valid) throw Object.assign(new Error('Password salah'), { code: 'UNAUTHORIZED' });
  } else {
    // Password masih plain text — cek lalu auto-upgrade ke bcrypt
    if (user.password !== password) {
      throw Object.assign(new Error('Password salah'), { code: 'UNAUTHORIZED' });
    }
    // Upgrade di background, tidak block response
    hashPassword(password)
      .then(hash => repo.updateUserPassword(user.id, hash))
      .catch(err  => console.error('[auth] password upgrade failed:', err));
  }

  return { id: user.id, fullName: user.full_name, email: user.email, role: user.role };
}
