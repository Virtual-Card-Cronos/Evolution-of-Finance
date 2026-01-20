/**
 * Database Connection Module
 * 
 * Establishes connection to Neon PostgreSQL database using Drizzle ORM.
 * Provides conditional database initialization based on environment configuration.
 * 
 * Features:
 * - Lazy database connection (only connects if DATABASE_URL is set)
 * - Exports database instance and configuration status
 * - Uses Neon's serverless driver for edge compatibility
 * 
 * @module lib/db/index
 */

import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Flag indicating if database URL is configured
 * Used to conditionally enable database features
 */
const isDatabaseConfigured = !!process.env.DATABASE_URL;

/**
 * Database instance
 * 
 * null if DATABASE_URL is not set, allowing the app to run
 * in demo mode with in-memory storage
 */
let db: NeonHttpDatabase<typeof schema> | null = null;

// Initialize database connection only if URL is configured
if (isDatabaseConfigured) {
  // Create Neon serverless SQL driver
  const sql = neon(process.env.DATABASE_URL!);
  
  // Create Drizzle ORM instance with schema
  db = drizzle(sql, { schema });
}

export { db, isDatabaseConfigured };
