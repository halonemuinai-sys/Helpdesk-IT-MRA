type Result<T> = { error: string } | { data: T };

export interface LoginBody {
  email: string;
  password: string;
}

export function validateLogin(body: unknown): Result<LoginBody> {
  if (typeof body !== 'object' || body === null)
    return { error: 'Request body tidak valid' };

  const b = body as Record<string, unknown>;
  if (typeof b.email !== 'string' || !b.email.trim())
    return { error: 'Email wajib diisi' };
  if (typeof b.password !== 'string' || !b.password)
    return { error: 'Password wajib diisi' };

  return { data: { email: b.email.trim().toLowerCase(), password: b.password } };
}
