import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Check if database URL is configured
const isDatabaseConfigured = !!process.env.DATABASE_URL;

// Create db instance only if DATABASE_URL is set
let db: NeonHttpDatabase<typeof schema> | null = null;

if (isDatabaseConfigured) {
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle(sql, { schema });
}

export { db, isDatabaseConfigured };
