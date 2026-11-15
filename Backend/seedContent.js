import 'dotenv/config';
import { Pool } from 'pg';
import content from './contentData.js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

for (const [key, data] of Object.entries(content)) {
  await pool.query(
    `INSERT INTO content_sections (section_key, data)
     VALUES ($1, $2)
     ON CONFLICT (section_key)
     DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [key, JSON.stringify(data)]
  );
}

console.log(`Seeded ${Object.keys(content).length} sections`);
await pool.end();