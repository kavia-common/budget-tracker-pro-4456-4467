const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Database connection pool configuration.
 * Uses POSTGRES_URL connection string from environment variables.
 * SSL is disabled for local development by default as requested.
 */
const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  // Log a clear message to assist configuration debugging
  console.warn('[DB] POSTGRES_URL is not set. Database features will fail until configured.');
} else {
  // Quick self-check: log masked URL host/port to verify DB port alignment (should often be 5001 in preview)
  try {
    const u = new URL(connectionString);
    console.log(`[DB] Connecting to ${u.hostname}:${u.port || '(default)'} database ${u.pathname.replace('/', '')}`);
  } catch (_) {
    console.warn('[DB] POSTGRES_URL appears malformed. Please verify.');
  }
}

const pool = new Pool({
  // Uses the POSTGRES_URL from environment; ensure it targets the DB (port 5001 in preview)
  connectionString,
  // For local dev environments, keep SSL disabled unless explicitly required by the provider
  ssl: false,
  // Reasonable pool defaults
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// PUBLIC_INTERFACE
function getDb() {
  /** Returns a configured pg.Pool instance for executing queries. */
  return pool;
}

// Helper to run queries safely with parameterization
// PUBLIC_INTERFACE
async function query(text, params) {
  /**
   * Executes a parameterized SQL query using the shared pool.
   * - text: SQL text with placeholders ($1, $2, ...)
   * - params: array of values for placeholders
   */
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // Simple debug log for slow queries
  if (duration > 500) {
    console.log('executed query', { text, duration, rows: res.rowCount });
  }
  return res;
}

module.exports = {
  pool,
  getDb,
  query,
};
