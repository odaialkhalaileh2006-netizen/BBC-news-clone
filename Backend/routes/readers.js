import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'readerToken';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function readersRouter(pool) {
  const router = express.Router();

  function setReaderCookie(res, reader) {
    const token = jwt.sign(
      { id: reader.id, email: reader.email, role: 'reader' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie(COOKIE_NAME, token, cookieOptions);
  }

  function authenticateReader(req, res, next) {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ error: 'Not signed in' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err || payload.role !== 'reader') {
        return res.status(401).json({ error: 'Not signed in' });
      }
      req.reader = payload;
      next();
    });
  }

  router.post('/register', async (req, res) => {
    try {
      const name = String(req.body.name ?? '').trim();
      const email = String(req.body.email ?? '').trim().toLowerCase();
      const password = String(req.body.password ?? '');

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      if (!EMAIL_PATTERN.test(email)) {
        return res.status(400).json({ error: 'Enter a valid email address' });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      const existing = await pool.query('SELECT id FROM readers WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO readers (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, passwordHash]
      );
      const reader = result.rows[0];

      setReaderCookie(res, reader);
      res.status(201).json(reader);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'An account with this email already exists' });
      }
      console.error(error);
      res.status(500).json({ error: 'Failed to create account' });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const email = String(req.body.email ?? '').trim().toLowerCase();
      const password = String(req.body.password ?? '');

      const result = await pool.query('SELECT * FROM readers WHERE email = $1', [email]);
      const reader = result.rows[0];

      if (!reader) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, reader.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      setReaderCookie(res, reader);
      res.json({ id: reader.id, name: reader.name, email: reader.email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to sign in' });
    }
  });

  router.get('/me', authenticateReader, async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, name, email FROM readers WHERE id = $1',
        [req.reader.id]
      );
      const reader = result.rows[0];

      if (!reader) {
        return res.status(401).json({ error: 'Not signed in' });
      }
      res.json(reader);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to load account' });
    }
  });

  router.post('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ success: true });
  });

  return router;
}

export default readersRouter;