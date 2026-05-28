const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read DATABASE_URL from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let databaseUrl = 'postgresql://postgres:postgres@localhost:5432/mra_helpdesk?search_path=ga,public';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)/);
  if (match) {
    databaseUrl = match[1];
  }
}

// Extract base connection string (to default 'postgres' database)
// E.g. postgresql://postgres:postgres@localhost:5432/mra_helpdesk -> postgresql://postgres:postgres@localhost:5432/postgres
const baseUrl = databaseUrl.replace(/\/([^/?]+)(\?|$)/, '/postgres$2');
const targetDb = 'mra_helpdesk';

async function run() {
  console.log('Connecting to default postgres database...');
  const baseClient = new Client({ connectionString: baseUrl });
  
  try {
    await baseClient.connect();
    
    // Check if target database exists
    const checkDb = await baseClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [targetDb]
    );
    
    if (checkDb.rows.length === 0) {
      console.log(`Database "${targetDb}" not found. Creating database...`);
      // CREATE DATABASE cannot run inside a transaction, so we execute it directly
      await baseClient.query(`CREATE DATABASE ${targetDb}`);
      console.log(`Database "${targetDb}" created successfully.`);
    } else {
      console.log(`Database "${targetDb}" already exists.`);
    }
  } catch (err) {
    console.error('Error checking or creating database:', err.message);
    console.log('\nTIP: Jika password database Anda bukan "postgres", silakan update di file .env.local terlebih dahulu.');
    process.exit(1);
  } finally {
    await baseClient.end();
  }

  console.log(`Connecting to "${targetDb}" database to run schema...`);
  const targetClient = new Client({ connectionString: databaseUrl });
  
  try {
    await targetClient.connect();
    
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`schema.sql not found at ${schemaPath}`);
    }
    
    const sql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Executing schema.sql...');
    await targetClient.query(sql);
    console.log('Schema executed successfully! Database IT Helpdesk MRA is ready.');
  } catch (err) {
    console.error('Error executing schema.sql:', err.message);
    process.exit(1);
  } finally {
    await targetClient.end();
  }
}

run();
