  // db.ts
  import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
  import { drizzle,type NodePgDatabase } from 'drizzle-orm/node-postgres';
  import { Pool } from 'pg';
  import { type InferModel } from 'drizzle-orm';
  



export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name'),
    phone: varchar('phone', { length: 256 }),
  });




const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,
});
export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>; // insert type // return type when queried
export const db: NodePgDatabase = drizzle(pool);