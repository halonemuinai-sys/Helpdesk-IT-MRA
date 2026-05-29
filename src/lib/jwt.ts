import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'CHANGE_ME_IN_PRODUCTION_AT_LEAST_32_CHARS'
);

const COOKIE_NAME = 'hd_session';
const EXPIRES_IN  = 60 * 60 * 24 * 7; // 7 hari (detik)

export interface SessionPayload extends JWTPayload {
  id:       number;
  name:     string;
  email:    string;
  role:     string;
}

export async function signSession(payload: Omit<SessionPayload, keyof JWTPayload>): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_IN}s`)
    .sign(SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, EXPIRES_IN };
