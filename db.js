import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS urls (
      shorten_url TEXT PRIMARY KEY,
      original_url TEXT NOT NULL
    );
  `);
};
initDB();

export default pool;
