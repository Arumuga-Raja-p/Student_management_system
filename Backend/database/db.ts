import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


const jwtSecret = process.env.JWT_SECRET;

console.log("Connected to DB:", process.env.DATABASE_URL);
