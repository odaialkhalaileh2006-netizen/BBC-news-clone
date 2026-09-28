# BBC News Homepage Clone

A full-stack clone of the BBC News homepage with a login-protected admin panel where writers can create, edit and delete articles (with image upload and a rich-text editor).

> **Disclaimer:** This is an educational project. It is not affiliated with, endorsed by, or connected to the BBC. "BBC" and related names, logos and content belong to their respective owners.

## Features

- Public homepage built from reusable React components (news columns, world news, sport, health, travel, audio sliders, etc.)
- Article pages at `/article/:id`
- Admin panel at `/admin` with full CRUD on articles, image upload and a Tiptap rich-text editor
- JWT authentication stored in an httpOnly cookie
- Role-based access: `admin` users can manage writer accounts at `/admin/writers`; `writer` users can manage articles
- Storybook for developing UI components in isolation

## Tech stack

| Part | Technologies |
| --- | --- |
| Frontend | React 17, Vite, Tailwind CSS, React Router, Tiptap, Swiper, Storybook |
| Backend | Node.js, Express, PostgreSQL (`pg`), JWT, bcryptjs, multer, cookie-parser, CORS |

## Project structure

```
.
├── Backend/
│   ├── server.js        # Express API
│   ├── createUser.js    # CLI script to create users (admin / writer)
│   ├── schema.sql       # Database tables
│   ├── uploads/         # Uploaded article images (git-ignored)
│   └── .env.example     # Environment variable template
└── Frontend/
    ├── src/
    │   ├── components/  # Layout, Home sections, UI pieces
    │   ├── admin/       # Login, admin page, writers page, editor
    │   ├── api/         # fetch helpers for the backend
    │   └── context/     # ContentContext
    └── .storybook/
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [PostgreSQL](https://www.postgresql.org/) installed and running

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Set up the database

```bash
createdb bbc_clone
psql -d bbc_clone -f Backend/schema.sql
```

### 3. Set up the backend

```bash
cd Backend
cp .env.example .env      # then open .env and fill in your values
npm install
```

Create your first admin account:

```bash
node createUser.js admin@example.com your_password admin
```

(The third argument is the role: `admin` or `writer`. It defaults to `writer`.)

Start the API:

```bash
npm run dev
```

The API runs at http://localhost:5000.

### 4. Set up the frontend

In a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173. The admin panel is at http://localhost:5173/admin.

> The backend only accepts requests from `http://localhost:5173` (CORS), and the frontend expects the API at `http://localhost:5000`.

### Optional: Storybook

```bash
cd Frontend
npm run storybook
```

## Environment variables (`Backend/.env`)

| Variable | Description |
| --- | --- |
| `PORT` | Port for the API (default `5000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign login tokens |

## API overview

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/content` | Public |
| GET | `/api/content/:section` | Public |
| GET | `/api/articles` | Public |
| GET | `/api/articles/:id` | Public |
| POST | `/api/login` | Public |
| POST | `/api/logout` | Public |
| GET | `/api/verify` | Logged in |
| POST | `/api/articles` | Logged in |
| PUT | `/api/articles/:id` | Logged in |
| DELETE | `/api/articles/:id` | Logged in |
| GET | `/api/users` | Admin |
| POST | `/api/users` | Admin |
| DELETE | `/api/users/:id` | Admin |

## License

Released under the [MIT License](LICENSE).
