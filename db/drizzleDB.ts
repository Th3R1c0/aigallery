  // db.ts
  import { integer, pgTable, serial, smallint, text, varchar } from 'drizzle-orm/pg-core';
  import { drizzle,type NodePgDatabase } from 'drizzle-orm/node-postgres';
  import { Pool } from 'pg';
  import { type InferModel } from 'drizzle-orm';
  



export const ranktable = pgTable('ranktable', {
    id: serial('id').primaryKey(),
    image: text('image').notNull(),
    rank: integer('rank').notNull(),
    totalvoates: integer('totalvoates').notNull(),
  });



const pool = new Pool({
  connectionString: 'postgresql://postgres:KXOsddZYcm38HKiZfliT@containers-us-west-117.railway.app:6248/railway',
});
export type Art = InferModel<typeof ranktable>;
export type NewArt = InferModel<typeof ranktable, 'insert'>; // insert type // return type when queried
export const db: NodePgDatabase = drizzle(pool);
