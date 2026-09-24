import { Pool } from "pg"

// Reaproveita o pool entre reloads em dev e entre invocações na mesma instância.
const globalForPg = globalThis as unknown as { pgPool?: Pool }

export const pool =
  globalForPg.pgPool ??
  new Pool({
    // Use a URL PÚBLICA do Railway (DATABASE_PUBLIC_URL) se o site está na Vercel.
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 3, // poucas conexões: cada instância serverless abre o seu pool
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  })

globalForPg.pgPool = pool