import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { unlink } from 'fs/promises';
import cookieParser from 'cookie-parser';
import readersRouter from './routes/readers.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.set('etag', false);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
app.use('/api/readers', readersRouter(pool));


function authenticateToken(req, res, next) {
  const token = req.cookies.token ;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    if (user.role !== 'admin' && user.role !== 'writer') {
      return res.status(403).json({ error: 'Staff only' });
    }
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only' });
  }
  next();
}


app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ valid: true,role: req.user.role });
});

app.get('/api/content', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT section_key, data FROM content_sections ORDER BY section_key COLLATE "C"'
    );
    const content = {};
    for (const row of result.rows) {
      content[row.section_key] = row.data;
    }
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token,
     { httpOnly: true, 
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 
    });

  res.json({ success: true,token,role: user.role });
});

app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const result = await pool.query(
      'SELECT data FROM content_sections WHERE section_key = $1',
      [section]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Unknown content section: ${section}` });
    }
    res.json(result.rows[0].data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

app.get('/api/articles', async (req, res) => {
  const result = await pool.query('SELECT * FROM articles ORDER BY id DESC');
  res.json(result.rows);
});

app.get('/api/articles/:id', async (req, res) => {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    const article = result.rows[0];
    
    if(!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
})

app.post('/api/articles', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, summary, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imageUrl = req.file.filename;

    if (!title || !summary || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO articles (title, summary, "imageUrl", content) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, summary, imageUrl, content]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});
app.put('/api/articles/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { title, summary,content } = req.body;

  let imageUrl;
  if (req.file) {
    const existing = await pool.query('SELECT "imageUrl" FROM articles WHERE id = $1', [req.params.id]);
    const oldImage = existing.rows[0]?.imageUrl;
    if (oldImage) {
      await unlink(`uploads/${oldImage}`).catch(() => {});
    }
    imageUrl = req.file.filename;
  } else {
    const existing = await pool.query('SELECT "imageUrl" FROM articles WHERE id = $1', [req.params.id]);
    imageUrl = existing.rows[0].imageUrl;
  }

  const result = await pool.query(
    'UPDATE articles SET title = $1, summary = $2, "imageUrl" = $3,"content" = $4 WHERE id = $5 RETURNING *',
    [title, summary, imageUrl, content, req.params.id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/articles/:id', authenticateToken, async (req, res) => {
  const existing = await pool.query('SELECT "imageUrl" FROM articles WHERE id = $1', [req.params.id]);
  const article = existing.rows[0];

  if (article && article.imageUrl) {
    await unlink(`uploads/${article.imageUrl}`).catch(() => {});
  }

  await pool.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const result = await pool.query("SELECT id, email, role FROM users WHERE role = 'writer' ORDER BY id DESC");
  res.json(result.rows);
});

app.post('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(

    'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id,email,role',
    [email, hashedPassword,'writer']
  );
  res.json(result.rows[0]);
});

app.delete('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = $1 AND role = 'writer'", [req.params.id]);
  res.json({ success: true });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Content API running at http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/content`);
});