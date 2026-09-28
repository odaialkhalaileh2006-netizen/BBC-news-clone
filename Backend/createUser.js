import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const email = process.argv[2];
const password = process.argv[3];
const role = process.argv[4] || 'writer';

const hashed = await bcrypt.hash(password, 10);
await pool.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3)', [email, hashed, role]);

console.log('User created:', email, '-', role);
process.exit(0);