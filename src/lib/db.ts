import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function getPool(): Pool {
  if (!global._pgPool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('[db] DATABASE_URL environment variable is not defined.');
    }
    
    global._pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // For local development on Laragon, SSL is not required.
      // But we support it if the user switches to Supabase.
      ssl: process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 8_000,
    });

    global._pgPool.on('error', (err) => {
      console.error('[db] pool error — resetting:', err.message);
      global._pgPool = undefined;
    });
  }
  return global._pgPool;
}

/**
 * Run a parameterised query.
 * Always sets search_path on the same client connection.
 */
export async function query(text: string, params?: unknown[]) {
  const client = await getPool().connect();
  try {
    await client.query('SET search_path TO ga, public');
    return await client.query(text, params as never[]);
  } finally {
    client.release();
  }
}
